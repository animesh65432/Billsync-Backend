import userrouter from "./users"
import Invoices from "./Invoices"
import check from "./check"
import remider from "./reminders"
import { Router } from "express"
import { rateLimiter } from "../middlewares"

const router = Router()

router.use(rateLimiter(20, 2 * 60 * 1000))
router.use("/check", check)
router.use("/users", userrouter)
router.use("/Invoices", Invoices)
router.use("/remider", remider)


export default router