import "dotenv/config"
import express from "express"

//Conexão com banco de dados
import conn from "./config/conn.js"

//Importação dos modulos e criação das tabelas
import "./models/livroModel.js"
import "./models/funcionariosModel.js"
import "./models/clienteModel.js"
import "./models/emprestimo.Model.js"

//importar rotas
import livroRoutes from "./routes/livrosRotas.js"
import funcionarioRoutes from "./routes/funcionarioRotas.js"
import clienteRoutes from "./routes/clienteRotas.js"
import emprestimoRoutes from "./routes/emprestimoRotas.js"

const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Utilização das rotas
// https://localhost:3000
app.use("/livros", livroRoutes)
app.use("/funcionarios", funcionarioRoutes)
app.use("/clientes", clienteRoutes)
app.use("/emprestimos", emprestimoRoutes)

app.get("/", (request, response) => {
    response.send("Olá, Mundo!")
})

app.listen(PORT, () => {
    console.log("Servidor on port" + PORT)
})