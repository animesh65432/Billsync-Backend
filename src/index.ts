import config from "./config"
import cors from "cors"
import express from "express"
import { createdummyuser } from "./Utils"
import router from "./routers"
import { errorMiddleware } from "./middlewares"
import cron from "node-cron"
import rundaily from "./corn"
import cookieparser from "cookie-parser"


const app = express()
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true
}))
app.use(cookieparser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/api", router)
app.use(errorMiddleware)

cron.schedule("0 0 * * *", () => {
    rundaily();
});


app.listen(config.PORT, () => {
    createdummyuser()
    console.log(`server start at ${config.PORT}`)
})
