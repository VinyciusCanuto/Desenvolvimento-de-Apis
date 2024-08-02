// Aqui é a tabela de motorista
import conn from "../config/conn.js"; // Conexão

const tableMotorista = /*sql*/ `
    CREATE TABLE IF NOT EXISTS motoristas(
        motorista_id VARCHAR(60) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        data_nascimento DATE NOT NULL,
        numero_carteira_habilitacao VARCHAR(60) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`
conn.query(tableMotorista, (err, result, field) => {
    if(err){
        console.error("Erro ao criar a tabela"+err.stack)
    }
    //console.log(result)
    //console.log(field)
    console.log("Tabela [Motorista] criada com sucesso")
})