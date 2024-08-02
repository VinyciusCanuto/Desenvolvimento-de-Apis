// Aqui é a tabela de CLIENTES
import conn from "../config/conn.js"; // Conexão

const tableEmprestimo = /*sql*/ `
    CREATE TABLE IF NOT EXISTS emprestimos(
        emprestimo_id VARCHAR(60) PRIMARY KEY,
        cliente_id VARCHAR(60) NOT NULL,
        livro_id VARCHAR(60) NOT NULL,
        data_emprestimo DATE NOT NULL,
        data_devolucao DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`
conn.query(tableEmprestimo, (err, result, field) => {
    if(err){
        console.error("Erro ao criar a tabela"+err.stack)
    }
    //console.log(result)
    //console.log(field)
    console.log("Tabela [Emprestimos] criada com sucesso")
})