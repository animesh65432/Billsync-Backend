import { Request, Response, NextFunction } from "express"

export type asyncfuncerrorpayload = (req: Request, res: Response, next: NextFunction) => Promise<void>
export type User = {
    id: number
    email: string
}
export type GetmailOptionsTypes = {
    invoiceid: number, UserEmail: string, clientEmail: string, clientName: string, amount: number, dueDate: Date
}