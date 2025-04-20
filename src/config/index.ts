import "dotenv/config";

interface Config {
    PORT?: string;
    DEV_DATABASE_URL?: string;
    PROD_DATABASE_URL?: string;
    PROD_DIRECT_URL?: string;
    JSONWEBTOEKN?: string
    NODEMAILER_EMAIL?: string
    NODEMAILER_EMAIL_PASSWORD?: string
}

const config: Config = {};

if (process.env.STAGE === "dev") {
    config.PORT = process.env.PORT || "3000";
    config.DEV_DATABASE_URL = process.env.DEV_DATABASE_URL || "";
    config.JSONWEBTOEKN = process.env.JSONWEBTOEKN
    config.NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL
    config.NODEMAILER_EMAIL_PASSWORD = process.env.NODEMAILER_EMAIL_PASSWORD

} else {
    config.PORT = process.env.PORT || "3000";
    config.PROD_DATABASE_URL = process.env.PROD_DATABASE_URL || "";
    config.PROD_DIRECT_URL = process.env.PROD_DIRECT_URL || "";
    config.JSONWEBTOEKN = process.env.JSONWEBTOEKN
    config.NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL
    config.NODEMAILER_EMAIL_PASSWORD = process.env.NODEMAILER_EMAIL_PASSWORD
}

export default config;
