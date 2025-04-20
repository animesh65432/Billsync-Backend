import { Router } from "express"
import { sentreminder, getallremider } from "../../controllers"
import { auth } from "../../middlewares"

const remider = Router()
remider.post("/sentreminder", auth, sentreminder)
remider.get("/getallremiders", auth, getallremider)

export default remider