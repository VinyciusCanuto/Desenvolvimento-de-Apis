import {Router} from "express"
import conn from "../config/conn.js"

// Import controllrs
import { getOnibus, cadastrarOnibus, buscarOnibus, editarOnibus, deletarOnibus } from "../controllers/onibusControllers.js"

const router = Router()

router.get("/", getOnibus)
router.post("/criar", cadastrarOnibus)
router.get("/:id", buscarOnibus)
router.put("/editar/:id", editarOnibus)
router.delete("/remover/:id", deletarOnibus)

export default router