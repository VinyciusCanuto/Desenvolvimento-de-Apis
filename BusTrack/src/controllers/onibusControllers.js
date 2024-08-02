import conn from "../config/conn.js";
import {v4 as uuidv4} from 'uuid';

export const getOnibus = (request, response) => {
    const sql = `SELECT * FROM linhas`
    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao listar os Onibus"})
            return console.log.error(err)
        }
        const onibus = data
        response.status(200).json(onibus)
    })
} 
export const cadastrarOnibus = (request, response) => {
    const { id_linha, id_motorista, placa, modelo, ano_fabricacao, capacidade } = request.body;
    const onibus_id = uuidv4();

    const sql = /*sql*/`INSERT INTO onibus (??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const sqlData = ["onibus_id", "id_linha", "id_motorista", "placa", "modelo", "ano_fabricacao", "capacidade",id, id_linha, id_motorista, placa, modelo, ano_fabricacao, capacidade];

    conn.query(sql, sqlData, (err) => {
        if(err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao cadastrar ônibus" });
        }
        return response.status(201).json({ message: "Ônibus cadastrado com sucesso", onibus_id: onibus_id });
    });
} 
export const buscarOnibus = (request, response) => {
    const {id} = request.params
    const sql = /*sql*/ `SELECT * FROM onibus WHERE ?? = ?`
    const sqlData = ["onibus_id",id]

    conn.query(sql, sqlData, (err, data) => {
        if (err) {
            console.error(err);
            return response.status(404).json({ message: "Erro ao buscar ônibus" });
        }

        if (data.length === 0) {
            return response.status(404).json({ message: "Ônibus não encontrado" });
        }

        const onibus = data[0]
        response.status(200).json(onibus)
    }); 
}
export const editarOnibus = (request, response) => {
    const { id } = request.params;
    const { id_linha, id_motorista, placa, modelo, ano_fabricacao, capacidade } = request.body;

    const sql = /*sql*/`UPDATE onibus SET ? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    const sqlData = ["id_linha", "id_motorista", "placa",  "modelo", "ano_fabricacao", "capacidade",id_linha, id_motorista, placa, modelo, ano_fabricacao, capacidade, id];

    conn.query(sql, sqlData, (err, result) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao editar ônibus" });
        }

        if (result.affectedRows === 0) {
            return response.status(404).json({ message: "Ônibus não encontrado" });
        }

        return response.status(200).json({ message: "Ônibus editado com sucesso" });
    });
} 
export const deletarOnibus = (request, response) => {
    const { id } = request.params;
    const sql = /*sql*/`DELETE FROM onibus WHERE ?? = ?`;
    const sqlData = ["onibus_id",id];

    conn.query(sql, sqlData, (err, info) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao deletar ônibus" });
        }

        if (info.affectedRows === 0) {
            return response.status(404).json({ message: "Ônibus não encontrado" });
        }

        return response.status(200).json({ message: "Ônibus deletado com sucesso" });
    }); 
}