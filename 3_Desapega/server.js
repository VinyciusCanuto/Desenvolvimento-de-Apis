import "dotenv/config"
import express from "express"
import path from "node:path"
import { fileURLToPath } from "node:url"

const PORT = process.env.PORT

// Importar conexão
import conn from "./src/config/conn.js"

// Importação dos Modulos (models) - TABELAS
import "./src/models/usuarioModel.js"
import "./src/models/objetoModel.js"
import "./src/models/objetoImagesModel.js"

// Importação das rotas (routes)
import usuarioRouter from "./src/routes/usuarioRoute.js"
import objetoRouter from "./src/routes/objetoRoute.js"

//Criação dos Middleware
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.urlencoded({extended: true})) //Para trabalhar com as imagens
app.use(express.json()) // Para trabalhar com texto

//Localizar onde esta a pasta public
app.use("/public", express.static(path.join(__dirname,  "public")))

//Utilização das rotas
app.use("/usuarios", usuarioRouter)
app.use("/objetos", objetoRouter)

//use = representa o midllware
// 404
app.use((request, response) => {
    response.status(404).json({message: "Recurso não encontrado"})
})

//ou 404 assim
// app.get("/", (request, response) => {
//     response.send("Olá, Mundo")
// })

app.listen(PORT, ()=>{
    console.log("Servidor on PORT" + PORT)
})
