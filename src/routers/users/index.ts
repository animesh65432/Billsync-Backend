import { Router } from "express"
import { createuser, loginuser } from "../../controllers"

const router = Router()
router.post("/singup", createuser)
router.post("/login", loginuser)

export default router