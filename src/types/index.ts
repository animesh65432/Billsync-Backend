import { Request, Response, NextFunction } from "express"

export type asyncfuncerrorpayload = (req: Request, res: Response, next: NextFunction) => Promise<void>
export type jwtpayload = {
    email: string
}
export type User = {
    id: number
    email: string
}