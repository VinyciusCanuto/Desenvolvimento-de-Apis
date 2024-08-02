import conn from "../config/conn.js";
import {v4 as uuidv4} from 'uuid';

export const getEmprestimo = (request, response) => {
    const sql = /*sql*/`SELECT * FROM emprestimos`
    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao listar os empréstimos"})
            return console.log.error(err)
        }
        const emprestimo = data
        response.status(200).json(emprestimo)
    })
}

export const cadastrarEmprestimo = (request, response) => {
    const {data_emprestimo, data_devolucao} = request.body

    //validações
    if (data_emprestimo){
        response.status(400).json({message: "A data de empréstimo é obrigatório"})
        return
    }
    if (data_devolucao){
        response.status(400).json({message: "A data de devolução é obrigatório"})
        return
    }

    const id = uuidv4()
        const insertSql = /*sql*/`INSERT INTO emprestimos
        (??, ??, ??, ??, ??)
        VALUES
        (?, ?, ?, ?, ?)`

        const insertData = ["emprestimo_id", "cliente_id", "livro_id", "data_emprestimo", "data_devolucao", 
        id, id, id, data_emprestimo, data_devolucao]

        conn.query(insertSql, insertData, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao cadastrar Empréstimo"})
                return 
            }
            response.status(201).json({message: "Empréstimo cadastrado com sucesso!", fields})
        })
}

export const buscarEmprestimo = (request, response) => {
    const {id} = request.params
    const sql = /*sql*/ `SELECT * FROM emprestimos WHERE ?? = ?`

    const sqlData = ["emprestimo_id",id]

    conn.query(sql, sqlData, (err, data) => {
        if(err){
            console.error(err)
            response.status(404).json({message: "Erro ao buscar empréstimo"})
            return
        }
    
        const emprestimo = data[0]
        return response.status(200).json(emprestimo)
    })
}

export const editarEmprestimo = (request, response) => {
    
}

export const deletarEmprestimo = (request, response) => {
    const {id} = request.params
    const deleteSql = /*sql*/`DELETE FROM funcionarios WHERE ?? = ?`
    const deleteSqlData = ["cliente_id",id]
    conn.query(deleteSql, deleteSqlData, (err, info)=>{
        if(err){
            console.error(err)
            return response.status(500).json({message: "Erro ao deletar um empréstimo"})
        }
        if(info.affectedRows === 0){
            return response.status(404).json({message: "Empréstimo não encontrado"})
        }

        response.status(204).send("Excluído")
    })  
}