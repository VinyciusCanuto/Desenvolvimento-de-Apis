import { response } from "express"
import jwt from "jsonwebtoken"
import conn from "../config/conn.js"

const getUserByToken = async (token) => {
    return new Promise ((resolve, reject)=>{
        if(!token){
            response.status(401).json({err: "Acesso negado!"})
            return
        }

        const decoded = jwt.verify(token, "SENHASUPERSEGURAEDIFICIL")
        // console.log("Função getUser",decoded)
        const userId = decoded.id
        // console.log(" userId: ",userId)

        const checkSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`
        const checkData = ["usuario_id", userId]

        conn.query(checkSql, checkData, (err, data)=>{
            if(err){
                console.error(err)
                response.status(400).json({err: "Erro ao buscar "})
                return
            }
            if(data){
                response.status(404).json({message: "Usuário não encontrado"})
            }
        })
    })
}

export default getUserByToken