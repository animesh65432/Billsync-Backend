import userrouter from "./users"
import { Router } from "express"

const router = Router()

router.use("/users", userrouter)

export default router