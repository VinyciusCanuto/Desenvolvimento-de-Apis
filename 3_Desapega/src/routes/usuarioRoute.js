//Rota de usuario
import { Router } from "express"

//Importar Controllers de usuarios
import { register, login, checkUser, getUserById, editUser } from "../controllers/usuarioControllers.js"

//Importar os helpers
import validarUsuario from "../helpers/validar-user.js"
import verifyToken from "../helpers/verify-token.js"

const router = Router()

//localhost:3333/usuarios/register
router.post("/register", validarUsuario, register)
router.post("/login", login)
router.get("/checkUser", checkUser) // Auxiliar o front-end
router.get("/:id", getUserById)
router.put("/edit/:id", verifyToken, editUser) //So pode permiter que o usuario editar alguma coisa, se o usuario estiver logado na aplicação(site)
export default router
