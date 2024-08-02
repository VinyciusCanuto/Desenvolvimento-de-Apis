import {Router} from "express"
import conn from "../config/conn.js"

// Import controllrs
import { getLinha, cadastrarLinha, buscarLinha, editarLinha, deletarLinha } from "../controllers/linhaControllers.js"

const router = Router()

router.get("/", getLinha)
router.post("/criar", cadastrarLinha)
router.get("/:id", buscarLinha)
router.put("/editar/:id", editarLinha)
router.delete("/remover/:id", deletarLinha)

export default router