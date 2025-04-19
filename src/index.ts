import config from "./config"
import express from "express"
import db from "./db"

const app = express()


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