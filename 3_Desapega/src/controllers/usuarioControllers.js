import conn from "../config/conn.js"
import bcrypt from "bcrypt"
import {v4 as uuidv4} from "uuid"
import jwt from "jsonwebtoken"
//Não precisa fazer as validações, pois ja foi feita nos helpers
//Agora faremos a logica da aplicação

//Helpers
import createUserToken from "../helpers/create-user-token.js"
import getToken from "../helpers/get-token.js"
import getUserByToken from "../helpers/get-user-by-token.js"

//Criar usuário
export const register = (request, response) => {
    const {nome, email, telefone, senha, confirmsenha} = request.body

    const checkEmailSQL =  /*sql*/`SELECT * FROM usuarios WHERE ?? = ?`
    const checkEmailData =  ["email", email]

    conn.query(checkEmailSQL, checkEmailData, async (err, data) => {
        if(err){
            console.log(err)
            response.status(500).json({err: "Não foi possivel buscar usuário"})
            return
        }
        if(data.length > 0){
            response.status(409).json({err: "E-mail já está em uso!"})
            return
        }

        //CRIAR A SENHA DO USUÁRIO = utilizando a biblioteca bcrypt
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)
        // console.log(salt)
        // console.log("Senha recebida", senha)
        // console.log("Senha Criptografada", senhaHash)

        //CADASTRAR USUÁRIO
        const id = uuidv4()
        const imagem = "userDeFault.png"

        const insertSql = /*sql*/`INSERT INTO usuarios
            (??, ??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?, ?)`
        const insertData = ["usuario_id", "nome", "email", "telefone", "senha", "imagem",
        id, nome, email, telefone, senhaHash, imagem]

        conn.query(insertSql, insertData, (err) => {
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao cadastrar usuário"})
                return
            }

            const usuarioSql = /*sql*/`SELECT * FROM usuarios WHERE ?? = ?`
            const usuarioData = ["usuario_id", id]
            conn.query(usuarioSql, usuarioData, async (err, data) =>{
                if(err){
                    console.error(err)
                    response.status(500).json({err: "Erro ao selecionar usuário"})
                    return
                }
                const usuario = data[0]
                //try e cath, sao como if e elses para função async e await
                try {
                    await createUserToken(usuario, request, response)
                } catch(error){
                    console.error(error)
                }

            })
            //Usuario esteja logado na aplicação
            // createUserToken()
            response.status(201).json({message:"Usuário cadastrado"})
        })
    })
}

//login
export const login = (request, response) => {
    const {email, senha} = request.body

    //Validações
    if(!email){
        response.status(400).json({message:"O email é obrigatória"})
    }
    if(!senha){
        response.status(400).json({message:"A senha é obrigatória"})
    }

    const checkSql = /*sql*/`SELECT * FROM usuarios WHERE ?? = ?`
    const checkData = ["email", email]
    
    conn.query(checkSql, checkData, async (err, data) => {
        if(err){
            console.log(err)
            response.status(500).json({message: "Erro ao buscar usuário"})
            return
        }

        if(data.length === 0) {
            response.status(404).json({message: "Usuário não encontrado"})
            return

        }

        const usuario = data[0]

        //Verificar se a senha existe/comparar senha
        const compararSenha = await bcrypt.compare(senha, usuario.senha) 
        // console.log("Senha do usuario:", senha)
        // console.log("Senha do Objeto:", usuario.senha)
        // console.log("Comparar senha:", compararSenha)
        if(!compararSenha){
            return response.status(401).json({message:"Senha Inválida"})
        }

        try{
            await createUserToken(usuario, request, response)
        } catch(error){
            console.error(error)
            response.status(500).json({message: "Erro ao processar informação"})
        }
    })
}

//Verificar usuário baseado no token
export const checkUser = (request, response) =>{
    let usuarioAtual 
    
    //Criar um helper para fazer a verificação
    if(request.headers.authorization){
        const token = getToken(request)
        
        //Decodificar o token
        const decoded = jwt.decode(token, "SENHASUPERSEGURAEDIFICIL")
    
        const usuarioId = decoded.id

        const checkSql = /*sql*/`SELECT * FROM usuarios WHERE ?? = ?`
        const checkData = ["usuario_id", usuarioId]

        conn.query(checkSql, checkData, (err,data) => {
            if(err){
                console.error(err)
                response.status(500).json({message:"Erro ao verificar usuário"})
                return
            }
            usuarioAtual = data[0]
            response.status(200).json(usuarioAtual)
        })
    } else {
        usuarioAtual = null
        response.status(200).json(usuarioAtual)
    }
}

export const getUserById = (request, response) => {
    const {id} = request.params

    const checkSql = /*sql*/`
    SELECT usuario_id, nome, email, telefone, imagem
    FROM usuarios
    WHERE ?? = ?
    `

    const checkData = ["usuario_id", id]
    conn.query(checkSql, checkData, (err, data) => {
        if(err){
            console.error(err)
            response.status(500).json({err: "Erro ao buscar usuário"})
            return
        }
        if(data.length === 0){
            response.status(404).json({err: "Usuário não encontrado"})
            return
        }

        const usuario = data[0]
        response.status(200).json(usuario)

    })
}

export const editUser = async (request, response) => {
    const {id} = request.params

    //Pegar o token do usuario logado na aplicação
    try{
        const token = getToken(request)
        //Buscar dados no banco, nova consulta ao banco
        const user = await getUserByToken(token)
        // console.log(user)
        const {nome, email, telefone} = request.params
        if(!nome){
            response.status(400).json({message: "O nome é obrigatório"})
            return 
        }
        if(!email){
            response.status(400).json({message: "O email é obrigatório"})
            return 
        }
        if(!telefone){
            response.status(400).json({message: "O telefone é obrigatório"})
            return 
        }

        const checkSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`
        const checkData = ["usuario_id", id]

        conn.query(checkSql, checkData, (err, data)=> {
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao buscar usuário"})
                return
            }
            if(data.length === 0){
                response.status(404).json({err: "Usuário não encontrado"})
                return
            }

            //Validação de usuario do banco é o mesmo do token
            //Verificar se o email ja esta em uso
            const checkEmailSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ? AND ?? != ?`
            const checkEmailData = ["email", email, "usuario_id", id]

            conn.query(checkEmailSql, checkEmailData, (err, data)=>{
                if(err){
                    console.error(err)
                    response.status(500).json({err: "Erro ao buscar email"})
                    return
                }
                if(data.length > 0){
                    response.status(409).json({err: "Email ja esta em uso"})
                    return
                }

                const updateSql = /*sql*/ `UPDATE usuarios SET ? WHERE ?? = ?`
                const updateData = [{nome, email, telefone}, "usuario_id", id]

                conn.query(updateSql, updateData, (err)=>{
                    if(err){
                        console.error(err)
                        response.status(500).json({err: "Erro ao atualizar o usuario"})
                        return
                    }
                    response.status(200).json({message: "Usuário Atualizado"})
                })

            })
        })

    } catch (error) {
        response.status(500).json({err: error})
    }
}