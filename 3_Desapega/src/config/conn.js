import mysql from "mysql2"

const conn = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST, //ou "localhost"
    user: process.env.MYSQL_USER, //ou "root"
    password: process.env.MYSQL_PASSWORD, //ou Sen@iDev77!.
    database: process.env.MYSQL_DATABASE, //ou "DESAPEGA",
    port: 3306
})


conn.query("SELECT 1 + 1 AS solution", (err, result, fields) => {
    if(err){
        return console.error(err)
    }
    console.log("The solution is: ", result[0].solution)
})

export default conn