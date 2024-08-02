import {Router} from "express"
import conn from "../config/conn.js"

// Import controllrs
import { getEmprestimo, cadastrarEmprestimo, buscarEmprestimo, editarEmprestimo, deletarEmprestimo } from "../controllers/emprestimoController.js"

const router = Router()

router.get("/", getEmprestimo)
router.post("/criar", cadastrarEmprestimo)
router.get("/:id", buscarEmprestimo)
router.put("/editar/:id", editarEmprestimo)
router.delete("/remover/:id", deletarEmprestimo)

export default router