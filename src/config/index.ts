import "dotenv/config";

interface Config {
    PORT?: string;
    DEV_DATABASE_URL?: string;
    PROD_DATABASE_URL?: string;
    PROD_DIRECT_URL?: string;
    JSONWEBTOEKN?: string
}

const config: Config = {};

if (process.env.STAGE === "dev") {
    config.PORT = process.env.PORT || "3000";
    config.DEV_DATABASE_URL = process.env.DEV_DATABASE_URL || "";
    config.JSONWEBTOEKN = process.env.JSONWEBTOEKN

} else {
    config.PORT = process.env.PORT || "3000";
    config.PROD_DATABASE_URL = process.env.PROD_DATABASE_URL || "";
    config.PROD_DIRECT_URL = process.env.PROD_DIRECT_URL || "";
    config.JSONWEBTOEKN = process.env.JSONWEBTOEKN
}

export default config;
