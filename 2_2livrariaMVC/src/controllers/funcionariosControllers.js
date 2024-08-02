// controlar as funções da tabela de funcionarios
import conn from "../config/conn.js";
import {v4 as uuidv4} from 'uuid';

// exportação e criação das rotas
export const getFuncionario = (request, response) => {
    const sql = /*sql*/`SELECT * FROM funcionarios`

    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao listar os funcionários"})
            return console.log.error(err)
        }
        const funcionarios = data
        response.status(200).json(funcionarios)
    })
} 

export const cadastrarFuncionario = (request, response) => {
    const {nome, cargo, data_contratacao, salario, email} = request.body

    //validações
    if (! nome){
        response.status(400).json({message: "O nome é obrigatório"})
        return
    }
    if (! cargo){
        response.status(400).json({message: "O cargo é obrigatório"})
        return
    }
    if (! data_contratacao){
        response.status(400).json({message: "A data_contratacao é obrigatório"})
        return
    }
    if (! salario){
        response.status(400).json({message: "O salario é obrigatório"})
        return
    }
    
    if (!email){
        response.status(422).json({message: "O email é obrigatório"})
        return
    }
    //validação email com o "@"
    if (!email.includes("@")){
        response.status(422).json({message: "O email deve conter @"})
        return
    }

     // verifica se o email consta no banco de dados
    const checkEmailSql = /*sql*/`SELECT * FROM funcionarios WHERE ?? = ?`
    const checkSqlData = [
        "email",
        email
    ]

    conn.query(checkEmailSql, checkSqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao listar os funcionários"})
            return console.log.error(err)
        }
        if(data.length > 0){
            response.status(409).json({message: "O email já está em uso"})
            return console.log.error(err)
        }

        const id = uuidv4()
        const insertSql = /*sql*/`INSERT INTO funcionarios
        (??, ??, ??, ??, ??, ??)
        VALUES
        (?, ?, ?, ?, ?, ?)`

        const insertSqlData = [
            "funcionario_id",
            "nome",
            "cargo",
            "data_contratacao",
            "salario",
            "email",
            funcionario_id,
            nome,
            cargo,
            data_contratacao,
            salario,
            email
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao cadastrar funcionário"})
                return 
            }
            response.status(201).json({message: "Funcionário cadastrado com sucesso!"})
        })
    })
}

export const buscarFuncionario = (request, response) => {
    const {id}= request.params

    const sql = /*sql*/`SELECT * FROM funcionarios WHERE ?? = ??`
    const sqlData = [
        "id",
        id
    ]

    conn.query(sql, sqlData, (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao tentar buscar funcionário"})
            return
        }

        if(data.length === 0){
            response.status(404).json({message: "Funcionário não encontrado!"})
            return
        }

        const funcionario = data[0]
        response.status(200).json(funcionario)
    })
}

export const editarFuncionario = (request, response) => {
    const {id}= request.params
    const {nome, cargo, data_contratacao, salario, email} = request.body
    if (! nome){
        response.status(400).json({message: "O nome é obrigatório"})
        return
    }
    if (! cargo){
        response.status(400).json({message: "O cargo é obrigatório"})
        return
    }
    if (! data_contratacao){
        response.status(400).json({message: "A data_contratacao é obrigatório"})
        return
    }
    if (! salario){
        response.status(400).json({message: "O salario é obrigatório"})
        return
    }
    
    if (!email){
        response.status(422).json({message: "O email é obrigatório"})
        return
    }
    //validação email com o "@"
    if (!email.includes("@")){
        response.status(422).json({message: "O email deve conter @"})
        return
    }

    const checkSql = /*sql*/`SELECT * FROM funcionarios WHERE ?? = ?`
    const checkSqlData = [
        "id",
        id
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        if(err){
            console.log(err)
            response.status(500).json({message: "Erro ao buscar dados"})
            return
        }
        if(data.length === 0){
            response.status(404).json({message: "Funcionário não encontrado"})
            return
        }

        //Verificar se um email que foi enviado e !# id
        const emailCheckSql = /*sql*/`SELECT * FROM funcionarios WHERE ?? = ? AND ?? != ?`
        const checkSqlEmailData = [
            "email",
            email,
            "id",
            id
        ]

        conn.query(emailCheckSql, checkSqlEmailData, (err, data)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao verificar os email"})
                return 
            }
            if(data.length > 0){
                return response.status(409).json({message: "O email já está em uso"})
            }

            const updateSql = /*sql*/`UPDATE funcionarios SET 
            ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?
            WHERE ?? = ?
            `
            const updateSqlData = [
                "nome",
                nome,
                "cargo",
                cargo,
                "data_contratacao",
                data_contratacao,
                "salario",
                salario,
                "email",
                email,
                "id",
                id
            ]

            conn.query(updateSql, updateSqlData, (err)=>{
                if(err){
                    console.error(err)
                    response.status(500).json({message: "Erro ao atualizar o funcionario"})
                    return
                }
                response.status(200).json({message: "Funcioário atualizado com sucesso!"})
            })
        })
    })
}

export const deletarFuncionario = (request, response) => {
    const {id}= request.params

    const deleteSql = /*sql*/`DELETE FROM funcionarios WHERE ?? = ?`
    const deleteSqlData = [
        "id",
        id
    ]

    conn.query(deleteSql, deleteSqlData, (err, info)=>{
        if(err){
            console.log(err)
            response.status(500).json({message: "Erro ao deletar funcionário"})
            return
        }
        if(info.affectedRows === 0){
            response.status(404).json({message: "Funcionário não encontrado"})
        }

        response.status(201).json({message: "Funcionário deletado!"})
    })
}

