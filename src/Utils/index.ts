import { Request, Response, NextFunction } from "express"
import { asyncfuncerrorpayload } from "../types"
const asyncerrorMiddleware = (func: asyncfuncerrorpayload) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(err => next(err));
    }
}

export { asyncerrorMiddleware }

