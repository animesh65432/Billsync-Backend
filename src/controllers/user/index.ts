import { Request, Response } from "express"
import db from "../../db"
import bcrypt from "bcrypt"
import jsonwebtoekn from "jsonwebtoken"
import config from "../../config"

const createuser = async (req: Request, res: Response) => {
    const { email, name, Password } = req.body

    if (!email || !name || !Password) {
        res.status(400).json({
            message: "Invaild credentials"
        })
        return
    }

    const exsitignuser = await db.user.findUnique({
        where: {
            email
        }
    })

    if (exsitignuser) {
        res.status(400).json({
            message: "user already exsit"
        })
        return
    }
    const hashpassword = await bcrypt.hash(Password, 10)

    await db.user.create({
        data: {
            email,
            name,
            Password: hashpassword
        }
    })

    res.status(201).json({
        message: "sucessfully create user"
    })
    return
}

const loginuser = async (req: Request, res: Response) => {
    const { email, Password } = req.body
    if (!email || !Password) {
        res.status(400).json({
            message: "Invaild credentials"
        })
    }
    const checkuser = await db.user.findUnique({
        where: {
            email
        }
    })

    if (!checkuser) {
        res.status(400).json({
            message: "user did not exsit"
        })
        return
    }

    const checkpassword = await bcrypt.compare(checkuser.Password as string, Password)

    if (!checkpassword) {
        res.status(400).json({
            message: "password is not coorect"
        })
        return
    }

    const token = jsonwebtoekn.sign(email, config.JSONWEBTOEKN as string)

    res.status(500).json({
        token,
        message: "sucessfully login"
    })
    return

}


export { createuser, loginuser }