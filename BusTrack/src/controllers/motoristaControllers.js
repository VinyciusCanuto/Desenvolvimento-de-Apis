import conn from "../config/conn.js";
import {v4 as uuidv4} from 'uuid';

export const getMotorista = (request, response) => {
    const sql = `SELECT * FROM linhas`
    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao listar os motoristas"})
            return console.log.error(err)
        }
        const motorista = data
        response.status(200).json(motorista)
    })
} 
export const cadastrarMotorista = (request, response) => {
    const { nome, data_nascimento, numero_carteira_habilitacao } = request.body;
    const id = uuidv4();

    const sql = /*sql*/`INSERT INTO motoristas (??, ??, ??, ??) VALUES (?, ?, ?, ?)`;
    const sqlData = ["motorista_id", "nome", "data_nascimento", "numero_carteira_habilitacao",id, nome, data_nascimento, numero_carteira_habilitacao];

    conn.query(sql, sqlData, (err) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao cadastrar motorista" });
        }
        return response.status(201).json({ message: "Motorista cadastrado com sucesso", motorista_id: id });
    });
} 
export const buscarMotorista = (request, response) => {
    const {id} = request.params
    const sql = /*sql*/ `SELECT * FROM motoristas WHERE ?? = ?`

    const sqlData = ["motorista_id",id]

    conn.query(sql, sqlData, (err, data) => {
        if(err) {
            console.error(err);
            return response.status(404).json({ message: "Erro ao buscar motorista" });
        }

        if(data.length === 0) {
            return response.status(404).json({ message: "Motorista não encontrado" });
        }

        const motorista = data[0]
        return response.status(200).json(motorista);
    });
}
export const editarMotorista = (request, response) => {
    const { id } = request.params;
    const { nome, data_nascimento, numero_carteira_habilitacao } = request.body;

    const sql = /*sql*/`UPDATE motoristas SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    const sqlData = ["nome", "data_nascimento", "numero_carteira_habilitacao", "motorista_id",nome, data_nascimento, numero_carteira_habilitacao, id];

    conn.query(sql, sqlData, (err, result) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao editar motorista" });
        }

        if (result.affectedRows === 0) {
            return response.status(404).json({ message: "Motorista não encontrado" });
        }

        return response.status(200).json({ message: "Motorista editado com sucesso" });
    });
} 
export const deletarMotorista = (request, response) => {
    const { id } = request.params;

    const sql = /*sql*/`DELETE FROM motoristas WHERE ?? = ?`;
    const sqlData = ["motorista_id",id];

    conn.query(sql, sqlData, (err, result) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao deletar motorista" });
        }

        if (result.affectedRows === 0) {
            return response.status(404).json({ message: "Motorista não encontrado" });
        }

        return response.status(200).json({ message: "Motorista deletado com sucesso" });
    });
}