import { Request, Response, NextFunction } from "express"
import { db } from "../db"
import config from "../config"
import JSONWEBTOEKN from "jsonwebtoken"

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if (!token) {
        res.status(400).json({
            messsage: "token is required"
        })
        return
    }

    const email = JSONWEBTOEKN.verify(token, config.JSONWEBTOEKN as string) as string
    if (!email) {
        res.status(400).json({
            message: "token is not vaild"
        })
        return
    }

    const checkuser = await db.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            email: true
        }
    })

    if (!checkuser) {
        res.status(400).json({
            message: "user did not found"
        })
        return
    }

    req.user = checkuser
    next()

}


export default auth