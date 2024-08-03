import { Router } from "express";

import { create } from "../controllers/objetoControllers.js"

//Helpers
import verifyToken from "../helpers/verify-token.js";
import imageUpload from "../helpers/image-upload.js"

const router = Router()
router.post("/create", verifyToken, imageUpload.array("imagens", 10), create)

export default router