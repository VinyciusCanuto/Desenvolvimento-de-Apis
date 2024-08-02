import {Router} from "express"
import conn from "../config/conn.js"

// Import controllrs
import { getMotorista, cadastrarMotorista, buscarMotorista, editarMotorista, deletarMotorista } from "../controllers/motoristaControllers.js"

const router = Router()

router.get("/", getMotorista)
router.post("/criar", cadastrarMotorista)
router.get("/:id", buscarMotorista)
router.put("/editar/:id", editarMotorista)
router.delete("/remover/:id", deletarMotorista)

export default router