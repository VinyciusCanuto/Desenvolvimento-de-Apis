import {Router} from "express"
import conn from "../config/conn.js"

// Import controllrs
import { getLivros, cadastrarlivro, buscarLivro, editarLivro, deletarLivro } from "../controllers/livrosController.js"

const router = Router()

router.get("/", getLivros)
router.post("/criar", cadastrarlivro)
router.get("/:id", buscarLivro)
router.put("/editar/:id", editarLivro)
router.delete("/remover/:id", deletarLivro )

export default router