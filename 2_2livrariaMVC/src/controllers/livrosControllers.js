// controlar as funções da tabela de livros 
import { request, response } from "express";
import conn from "../config/conn.js";
import {v4 as uuidv4} from 'uuid';

// exportação e criação das rotas
export const getLivros = (request, response) => {
    const sql = /*sql*/ `SELECT * FROM livros`
    conn.query(sql, (err, data) => {
        if(err){
            response.status(500).json({message: "Erro ao buscar livros"})
            return ;
        }
        const livros = data // serve para desestruturar as informações e elas aparecerem da forma mais "correta"
        response.status(200).json(livros);
    });
};

export const cadastrarlivro = (request, response) => {
    const {titulo, autor, ano_publicacao, genero, preco} = request.body // tá recebendo as requisições

    // validação
    // vai ser um if para cada umas das informações, para garantir que não venham vazios
    if(!titulo){
        response.status(400).json({message: "O titulo é obrigatorio"})
        return
    }
    if(!autor){
        response.status(400).json({message: "O autor é obrigatorio"})
        return
    }
    if(!ano_publicacao){
        response.status(400).json({message: "O ano de publicação é obrigatorio"})
        return
    }
    if(!genero){
        response.status(400).json({message: "O genero é obrigatorio"})
        return
    }
    if(!preco){
        response.status(400).json({message: "O preço é obrigatorio"})
        return
    }

    // cadastrar um livro -> antes preciso saber se esse livro existe
    // const checkSql = /*sql*/ `
    // SELECT * FROM livros 
    // WHERE titulo = "${titulo}" AND 
    // autor = "${autor}" AND 
    // ano_publicacao = "${ano_publicacao}"
    // `;

    const checkSql = /*sql*/ `SELECT * FROM livros WHERE ?? = ?
    AND ?? = ? AND ??= ?`

    const checkSqlData = [
        "titulo",
        titulo, 
        "autor",
        autor, 
        "ano_publicacao",
        ano_publicacao
    ]

    conn.query(checkSql, checkSqlData, (err, data) => {
        if(err){
            response.status(500).json({message: "Erro ao buscar os livros"})
            return console.log(err)
        }
        if(data.length > 0){ // se for maior que 0 significa que já existe um livro com essas informações
            response.status(409).json({message: "Livro já existe na livraria"}) // 409 - deu certo mas não esparava esses dados
            return console.log(err)
        }
        const id = uuidv4() // passando o id aleatório através do uuid
        const disponibilidade = 1 // aqui coloca 1 pq o banco de dados lá vai interpretar que está disponivel, e se estamos cadastrando é pq iremos ter o livro disponível

        const insertSql = /*sql*/ `INSERT INTO livros
        (??, ??, ??, ??, ??, ??, ??) /*Colunas são duas interrogações (??), 
        caso alguem tente acessar, não consiguira ver (NO BROWSER) nossas colunas, pois*/
        VALUES (?, ?, ?, ?, ?, ?, ?)` /*Valores são apenas uma interrogação (?)*/

        // agora vamos cadastrar as informações
        // const insertSql = /*sql*/ `insert into livros(id, titulo, autor, ano_publicacao, genero, preco, disponibilidade) 
        // values("${id}","${titulo}","${autor}","${ano_publicacao}","${genero}","${preco}","${disponibilidade}");`

        const insertData = ["livro_id", "titulo", "autor","ano_publicacao", "genero", "preco", "disponibilidade", 
        id, titulo, autor, ano_publicacao, genero, preco, disponibilidade] // Mais seguro

        conn.query(insertSql, insertData, (err) => {
            if(err){
                response.status(500).json({message: "Erro ao cadastrar livro"})
                return console.log(err)
            }
            response.status(201).json({message: "Livro cadastrado"})
        })
    })
};

export const buscarLivro = (request, response) => {
    const {id} = request.params // pega o id que for passado na rota

    const sql = /*sql*/ `SELECT * FROM livros WHERE ?? = ?`
    const dataSql = ["livro_id", id]
    
    conn.query(sql, dataSql, (err, data) => {
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao buscar livro"})
            return
        }
        if(data.length === 0){
            response.status(404).json({message: "Livro não encontrado"})
            return
        }
        const livro = data[0] // pra poder receber só o objeto, pq ele estava recebendo os livros dentro um outro objeto
        return response.status(200).json(livro)
    })
};

export const editarLivro = (request, response) => {
    const {id} = request.params // pega o id que for passado na rota
    const {titulo, autor, ano_publicacao, genero, preco, disponibilidade} = request.body;

    // Validações
    if(!titulo){
        response.status(400).json({message: "O titulo é obrigatorio"})
        return
    }
    if(!autor){
        response.status(400).json({message: "O autor é obrigatorio"})
        return
    }
    if(!ano_publicacao){
        response.status(400).json({message: "O ano de publicação é obrigatorio"})
        return
    }
    if(!genero){
        response.status(400).json({message: "O genero é obrigatorio"})
        return
    }
    if(!preco){
        response.status(400).json({message: "O preço é obrigatorio"})
        return
    }
    if(disponibilidade === undefined){ // precisa ser um valor de 1 ou 0, se for undefined ent está tendo algum erro, por isso a validação - O 0 representa um falso no banco de dados, ou seja, não tem disponibilidade
        response.status(400).json({message: "O disponibilidade é obrigatorio"})
        return
    }
    const checkSql = /*sql*/ `SELECT * FROM livros WHERE ?? = ?`  // aqui ele verifica no banco de dados se o id do livro corresponde ao id que está sendo passado aqui (no thunderclient)
    
    const dataCheckSql = ["livro_id", id]

    conn.query(checkSql, dataCheckSql, (err, data) => {
        if(err){
            console.error(err)
            response.status(500).json({message:"Erro ao buscar livro"})
        }
        if(data.length === 0){
            return response.status(404).json({message: "Livro não encontrado"})
        }
    })
    // Consulta sql para atualizar o livro
    const updateSql = /*sql*/ `UPDATE livros SET
    ?? = "${titulo}", ?? = ?, ?? = ?, 
    ?? = ?, ?? = ?, ?? = ?
    WHERE ?? = ?`

    const updateData = [
        "titulo",
        titulo,
        "autor",
        autor,
        "ano_punlicacao",
        ano_publicacao,
        "genero",
        genero, 
        "preco",
        preco, 
        "disponibiidade",
        disponibilidade,
        "livro_id",
        id 
    ]

    conn.query(updateSql, updateData, (err)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao atualizar livro no banco de dados"})
        }
        response.status(200).json({message: "Livro atualizado"})
    })
     
};

export const deletarLivro = (request, response) => {
    const {id} = request.params // pega o id que for passado na rota

    const deleteSql = /*sql*/ `DELETE FROM livros WHERE ?? = ?`
    const deleteData = ["livro_id", id]

    conn.query(deleteSql, deleteData, (err, info) => {
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao deletar livro"})
            return
        }
        if(info.affectedRows === 0){
            response.status(404).json({message: "Livro não encontrado"})
            return 
        }
        response.status(200).json({message: "Livro selecionado foi deletado"})
    })
};
