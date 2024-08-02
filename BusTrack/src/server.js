import "dotenv/config"
import express from "express"

//Conexão com banco de dados
import conn from "./config/conn.js"

//Importação dos modulos e criação das tabelas
import "./models/linhaModel.js"
import "./models/motoristaModel.js"
import "./models/onibusModel.js"

//importar rotas
import linhaRoutes from "./routes/linhaRota.js"
import motoristaRoutes from "./routes/motoristaRota.js"
import onibusRoutes from "./routes/onibusRota.js"

const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Utilização das rotas
// https://localhost:3000
app.use("/linhas", linhaRoutes)
app.use("/motoristas", motoristaRoutes)
app.use("/onibus", onibusRoutes)

app.get("/", (request, response) => {
    response.send("Olá, Mundo!")
})

app.listen(PORT, () => {
    console.log("Servidor on port" + PORT)
})