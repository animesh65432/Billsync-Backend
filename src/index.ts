import config from "./config"
import express from "express"

const app = express()


app.listen(config.PORT, () => {
    console.log(`server start at ${config.PORT}`)
})