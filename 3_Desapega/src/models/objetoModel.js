import conn from "../config/conn.js"; // Conexão

const tableObjeto = /*sql*/ `
    CREATE TABLE IF NOT EXIST objetos (
    objeto_id VARCHAR(60) PRIMARY KEY,
    nome VARCHAR(255) NOT null,
    peseo VARCHAR(255) NOT null,
    cor VARCHAR(255) NOT null,
    descrição TEXT,
    disponivel BOOLEAN,
    usuario_id VARCHAR(60),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
    )
`

conn.query(tableObjeto, (err) => {
    if(err){
        console.error(err)
        return
    }
    console.log("Tabela [objetos] criada com sucesso!" )
})


