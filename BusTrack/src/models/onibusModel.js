// Aqui é a tabela de onibus
import conn from "../config/conn.js"; // Conexão

const tableOnibus = /*sql*/ `
    CREATE TABLE IF NOT EXISTS onibus(
        onibus_id VARCHAR(60) PRIMARY KEY,
        id_linha VARCHAR(60) NOT NULL,
        id_motorista VARCHAR(60) NOT NULL,
        placa VARCHAR(20) PRIMARY KEY,
        modelo VARCHAR(255) NOT NULL,
        ano_fabricacao YEAR NOT NULL,
        capacidade INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`
conn.query(tableOnibus, (err, result, field) => {
    if(err){
        console.error("Erro ao criar a tabela"+err.stack)
    }
    //console.log(result)
    //console.log(field)
    console.log("Tabela [Onibus] criada com sucesso")
})