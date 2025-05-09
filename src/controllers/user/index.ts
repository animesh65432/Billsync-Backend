import { Request, Response } from "express"
import { db } from "../../db"
import bcrypt from "bcrypt"
import jsonwebtoekn from "jsonwebtoken"
import config from "../../config"
import { asyncerrorhandler } from "../../Utils"
import { googleclient } from "../../services"


const createuser = asyncerrorhandler(async (req: Request, res: Response) => {
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
            password: hashpassword
        }
    })

    res.status(201).json({
        message: "sucessfully create user"
    })
    return
})

const loginuser = asyncerrorhandler(async (req: Request, res: Response) => {

    const { email, Password } = req.body
    if (!email || !Password) {
        res.status(400).json({
            message: "Invaild credentials"
        })
        return
    }
    const checkuser = await db.user.findUnique({
        where: {
            email
        },
    })

    if (!checkuser) {
        res.status(400).json({
            message: "user did not exsit"
        })
        return
    }


    const checkpassword = await bcrypt.compare(Password, checkuser.password as string)
    if (!checkpassword) {
        res.status(400).json({
            message: "password is not coorect"
        })
        return
    }

    const token = jsonwebtoekn.sign(email, config.JSONWEBTOEKN as string)

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        token,
        message: "sucessfully login"
    })
    return

})


const googleAuth = asyncerrorhandler(async (req: Request, res: Response) => {
    const { credential, clientId } = req.body;

    if (!credential || !clientId) {
        res.status(400).json({ message: "Missing credential or client ID" });
        return
    }

    const ticket = await googleclient.verifyIdToken({
        idToken: credential,
        audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
        res.status(400).json({ message: "Invalid Google token payload" });
        return
    }

    const { email } = payload

    let user = await db.user.findUnique({
        where: {
            email

        },
    });

    if (!user) {
        user = await db.user.create({
            data: { email },
        });
    }

    const token = jsonwebtoekn.sign(email, config.JSONWEBTOEKN as string)

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(user ? 200 : 201).json({
        message: user ? "Successfully logged in" : "Account created and logged in",
        token
    });
    return
});




export { createuser, loginuser, googleAuth }