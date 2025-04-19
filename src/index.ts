import config from "./config"
import cors from "cors"
import express from "express"
import db from "./db"
import router from "./routers"
import { errorMiddleware } from "./middlewares"

const app = express()
app.use(cors({
    origin: "*"
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/api", router)
app.use(errorMiddleware)


app.listen(config.PORT, async () => {
    try {
        const users = await db.user.findMany()
        console.log(users)
        app.listen(config.PORT, () => {
            console.log(`server start at ${config.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
})