import conn from "../config/conn.js";
import {v4 as uuidv4} from 'uuid';

export const getLinha = (request, response) => {
    const sql = `SELECT * FROM linhas`
    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao listar as Linhas"})
            return console.log.error(err)
        }
        const linhas = data
        response.status(200).json(linhas)
    })
}
export const cadastrarLinha = (request, response) => {
    const { nome_linha, numero_linha, itinerario } = request.body;
    const id = uuidv4();

    const sql = /*sql*/ `INSERT INTO linhas (??, ??, ??, ??) VALUES (?, ?, ?, ?)`;
    const sqlData = ["linha_id","nome_linha", "numero_linha", "itinerario", id, nome_linha, numero_linha, itinerario ];

    conn.query(sql, sqlData, (err) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao cadastrar linha" });
        }
        return response.status(201).json({ message: "Linha cadastrada com sucesso", linha_id: id });
    });
} 
export const buscarLinha = (request, response) => {
    const {id} = request.params
    const sql = /*sql*/ `SELECT * FROM linhas WHERE ?? = ?`

    const sqlData = ["linha_id",id]

    conn.query(sql, sqlData, (err, data) => {
        if (err) {
            console.error(err);
            return response.status(404).json({ message: "Erro ao buscar linha" });
        }

        if (data.length === 0) {
            return response.status(404).json({ message: "Linha não encontrada" });
        }

        const linha = data[0]
        return response.status(200).json(linha);
    });
}
export const editarLinha = (request, response) => {
    const {id} = request.params
    const {nome_linha, numero_linha, itinerario,} = request.body

    if (!nome_linha){
        response.status(400).json({message: "O nome da linha é obrigatório"})
        return
    }
    if (!numero_linha){
        response.status(400).json({message: "O numero da linha é obrigatório"})
        return
    }
    if (!itinerario){
        response.status(400).json({message: "O itinerario é obrigatório"})
        return
    }
    const checkSql = /*sql*/`SELECT * FROM linhas WHERE ?? = ?`

    const checkSqlData = ["linha_id",id]

    conn.query(checkSql, checkSqlData, (err, data) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao editar linha" });
        }
        if (data.affectedRows === 0) {
            return response.status(404).json({ message: "Linha não encontrada" });
        }

        return response.status(200).json({ message: "Linha editada com sucesso" });
    })
}
export const deletarLinha = (request, response) => {
    const { id } = request.params;
    const deleteSql = /*sql*/ `DELETE FROM linhas WHERE ?? = ?`;
    const deleteSqlData = ["linha_id", id];
    conn.query(deleteSql, deleteSqlData, (err, info) => {
        if(err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao deletar linha" });
        }
        if(info.affectedRows === 0) {
            return response.status(404).json({ message: "Linha não encontrada" });
        }

        return response.status(200).json({ message: "Linha deletada com sucesso" });
    });
}