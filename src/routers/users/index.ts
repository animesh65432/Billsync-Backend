import { Router } from "express"
import { createuser, loginuser, googleAuth } from "../../controllers"

const router = Router()
router.post("/singup", createuser)
router.post("/login", loginuser)
router.post("/google-auth", googleAuth)

export default router