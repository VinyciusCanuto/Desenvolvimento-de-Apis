import {Router} from "express"
import conn from "../config/conn.js"

// Import controllrs
import { getFuncionario, cadastrarFuncionario, buscarFuncionario, editarFuncionario, deletarFuncionario } from "../controllers/funcionariosController.js"

const router = Router()

router.get("/", getFuncionario)
router.post("/criar", cadastrarFuncionario)
router.get("/:id", buscarFuncionario)
router.put("/editar/:id", editarFuncionario)
router.delete("/remover/:id", deletarFuncionario)

export default router