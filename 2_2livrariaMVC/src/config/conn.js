import "dotenv/config"
import mysql from "mysql2"

const conn = mysql.createPool({ // ajuda a não sobrecarregar o nosso software (melhor que o Connection)
    connectionLimit: 10, // o  limite de conexão
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, //Sen@iDev77!.
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
})

// conn.connect((err) => {
//     if(err){
//         return console.error(err.stack)
//     }
//     console.log("Mysql Conectado")
// })

export default conn