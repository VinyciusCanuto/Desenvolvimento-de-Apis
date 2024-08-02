// Aqui é a tabela de CLIENTES
import conn from "../config/conn.js"; // Conexão

const tableLinha = /*sql*/ `
    CREATE TABLE IF NOT EXISTS linhas(
        linha_id VARCHAR(60) PRIMARY KEY,
        nome_linha VARCHAR(255) NOT NULL,
        numero_linha VARCHAR(255) NOT NULL,
        itinerario VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`
conn.query(tableLinha, (err, result, field) => {
    if(err){
        console.error("Erro ao criar a tabela"+err.stack)
    }
    //console.log(result)
    //console.log(field)
    console.log("Tabela [Linhas] criada com sucesso")
})