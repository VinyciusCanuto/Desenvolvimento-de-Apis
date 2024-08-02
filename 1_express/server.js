
import express, { request } from "express" // OU const express = require('express') 
import {v4 as uuidv4} from "uuid"
const PORT = 3333

const app = express() //atribuindo todo o express a uma variavel chamada app

// app(com o express) + rota para ser trabalhada (get,post,put,delete) e o endereço de caminho da url + (req(request(pedido)), res(responde)resposta))

// Aceitar JSON
app.use(express.json())

/** 3 TIPOS DE REQUEST HTTP
 * 1-query params - http//localhost:3333/pessoas?nome="Vinycius"&idade=32
 * Rotas do tipo GET (filtros e buscas)
 * 2-route params - http//localhost:3333/pessoas/5
 * Rotas do tipo GET, PUT, PATCH, DELETE (selecionar, listar ou atualizar um elemento)
 * 3-body params - http//localhost:3333/pessoas
 * Rotas do tipo POST (Cadastro de informações)
 */

// Rotas

//Middleware
const logRoutes = (resquest, response, next) => {
    const {url, method} = request
    const rota = `[${method.toUpperCase()}] ${url}`
    console.log(rota)
    next()
}

//Middleware para todas as rotas
app.use(logRoutes)

const users = []
app.get("/users", (request,response)=>{
    response.status(200).json(["Pessoa 1","Pessoa 2","Pessoa 3"])
})

//Body Params
app.post("/users",(request,response)=>{
    const {nome, idade} = request.body

    //Validações
    if(!nome) {
        response.status(400).json({message: "O nome é obrigatório"})
        return
    }
    if(idade){
        response.status(400).json({message: "A idade é obrigatório"})
        return
    }

    const user = {
        id: uuidv4(),
        nome,
        idade
    }
    users.push(user)
    response.status(201).json({
        message:"Usuário cadastrado",
        user
    })

    response.status(201).json(["Pessoa 1","Pessoa 2","Pessoa 3","Pessoa 4"])
})

//Route Params
app.put("/users/:id",(request,response)=>{
    const {id} = request.params
    const {nome, idade} = request.body

    const indexUser = users.findIndex((user) => user.id == id)
    if(indexUser === -1) {
        response.status(404).json({message: "Usuário não encontrado"})
        return
    }
    if(!nome || !idade) {
        response.status(400).json({message: "O nome e idade são campos obrigatório"})
        return
    }

    const updateUser = {
        id,
        nome,
        idade
    }

    users[indexUser] = updateUser
    response.status(200).json(updateUser)
})

app.delete("/users/:id",(request,response)=>{
    const id = request.params.id

    const indexUser = users.findIndex((user) => user.id == id)
    if(indexUser === -1) {
        response.status(404).json({message: "Usuário não encontrado"})
        return
    }

    users.splice(indexUser, 1)
    response.status(204).send("apagado")
})

app.listen(PORT, () =>{
    console.log("Servidor on PORT"+PORT)
})