import "dotenv/config"

const config: { PORT?: string } = {}

if (process.env.STAGE === "dev") {
    config.PORT = process.env.PORT
} else {
    config.PORT = process.env.PORT
}

export default config
