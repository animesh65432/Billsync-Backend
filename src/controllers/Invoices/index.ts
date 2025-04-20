import { Request, Response } from "express"
import { asyncerrorhandler } from "../../Utils"
import { db, status } from "../../db"

const GetInvoices = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.id)

    const clients = await db.invoice.findMany({
        where: {
            userId
        },
        select: {
            clientName: true,
            id: true,
            amount: true,
            status: true,
            dueDate: true,
            reminderSent: true
        }
    })

    res.status(200).json({
        clients
    })
    return
})

const CreateInvoice = asyncerrorhandler(async (req: Request, res: Response) => {
    const { clientName, amount, dueDate, Mail } = req.body

    if (!clientName || !amount || !dueDate || !Mail) {
        res.status(400).json({
            message: "it's required"
        })
        return
    }
    const userId = Number(req.user?.id)

    await db.invoice.create({
        data: {
            clientName,
            amount,
            dueDate,
            userId,
            reminderSent: false,
            status: status.PENDING,
            Mail
        }
    })

    res.status(201).json({
        message: "client create it "
    })
    return
})

const GetInvoice = asyncerrorhandler(async (req: Request, res: Response) => {
    const { id } = req.query
    const invoiceId = Number(id)

    if (!invoiceId) {
        res.status(400).json({
            message: " id is required"
        })
        return
    }

    const client = await db.invoice.findUnique({
        where: {
            id: invoiceId
        },
        select: {
            id: true,
            clientName: true,
            amount: true,
            status: true,
            reminder: true,
            dueDate: true
        }
    })

    res.status(200).json({
        client
    })
    return
})

const UpdateInvoice = asyncerrorhandler(async (req: Request, res: Response) => {
    const {
        clientName,
        amount,
        status,
        reminder,
        dueDate } = req.body
    const { id } = req.query
    const invoiceId = Number(id)

    if (!invoiceId) {
        res.status(400).json({
            message: " id is required"
        })
        return
    }
    if (!clientName || !amount || !dueDate || !status || !reminder) {
        res.status(400).json({
            message: "it's required"
        })
    }

    await db.invoice.update({
        where: {
            id: invoiceId
        },
        data: {
            clientName,
            amount,
            dueDate,
            status,
            reminder
        }
    })

    res.status(200).json({
        message: "Invoice updated successfully"
    })
    return
})

const DeleteInvoice = asyncerrorhandler(async (req: Request, res: Response) => {
    const { id } = req.query
    const invoiceId = Number(id)

    if (!invoiceId) {
        res.status(400).json({
            message: "id is required"
        })
        return
    }

    await db.invoice.delete({
        where: {
            id: invoiceId
        }
    })

    res.status(200).json({
        message: "sucessfully delete it"
    })
    return

})

const Mark_as_paid = asyncerrorhandler(async (req: Request, res: Response) => {
    const { id } = req.query
    const invoiceId = Number(id)

    if (!invoiceId) {
        res.status(400).json({
            message: " id is required"
        })
        return
    }

    await db.invoice.update({
        where: {
            id: invoiceId
        },
        data: {
            status: "SUCCEED"
        }
    })

    res.status(200).json({
        message: "make as paid",

    })
    return
})

export { GetInvoice, GetInvoices, CreateInvoice, UpdateInvoice, DeleteInvoice, Mark_as_paid }