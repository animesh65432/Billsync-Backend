import userrouter from "./users"
import Invoices from "./Invoices"
import check from "./check"
import remider from "./reminders"
import { Router } from "express"

const router = Router()

router.use("/check", check)
router.use("/users", userrouter)
router.use("/Invoices", Invoices)
router.use("/remider", remider)


export default router