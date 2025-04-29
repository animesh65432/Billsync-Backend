import config from "./config"
import cors from "cors"
import express from "express"
import { db } from "./db"
import router from "./routers"
import { errorMiddleware } from "./middlewares"
import cron from "node-cron"
import rundaily from "./corn"
import cookieparser from "cookie-parser"
import bcyrpt from "bcrypt"


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

app.listen(config.PORT, async () => {
    try {

        // const Password = await bcyrpt.hash("testpassword", 10)
        // const users = await db.user.create({
        //     data: {
        //         email: "test@gmail.com",
        //         Password
        //     }
        // })
        // console.log(users)
        app.listen(config.PORT, () => {
            console.log(`server start at ${config.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
})