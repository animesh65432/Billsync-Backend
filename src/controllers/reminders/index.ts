import { Request, Response } from "express"
import { asyncerrorhandler, GetmailOptions, tellToFounder } from "../../Utils"
import { nodemailer } from "../../services"
import { db } from "../../db"
import config from "../../config"
const sentreminder = asyncerrorhandler(async (req: Request, res: Response) => {
    const { Id } = req.query;
    const invoiceId = Number(Id);

    if (!invoiceId || !req.user) {
        res.status(400).json({ message: "invoiceId is required" });
        return;
    }

    const invoice = await db.invoice.findFirst({
        where: { id: invoiceId, userId: req.user?.id },
    });

    if (!invoice) {
        res.status(400).json({ message: "Invoice not found" });
        return;
    }

    if (invoice.status === "SUCCEED") {
        res.status(400).json({ message: "Client already paid it" });
        return;
    }


    await Promise.all([
        db.reminder.create({
            data: {
                invoiceId,
                sentAt: new Date(),
            },
        }),
        db.invoice.update({
            where: { id: invoiceId },
            data: { reminderSent: true },
        }),
    ]);


    const founderEmail = req.user.email === "test@gmail.com" ? config.NODEMAILER_EMAIL : req.user.email;

    await Promise.all([
        nodemailer.sendMail(GetmailOptions({
            invoiceid: invoice.id,
            clientEmail: invoice.Mail,
            clientName: invoice.clientName,
            dueDate: invoice.dueDate,
            amount: invoice.amount,
            UserEmail: req.user.email,
        })),
        nodemailer.sendMail(tellToFounder({
            username: invoice.clientName,
            userid: invoice.id,
            foundermail: founderEmail!,
        })),
    ]);

    res.status(201).json({ message: "Reminder sent successfully!" });
});

const getallremider = asyncerrorhandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const [reminders, total] = await Promise.all([
        db.reminder.findMany({
            where: {
                invoice: {
                    userId: req.user?.id
                }
            },
            include: {
                invoice: true
            },
            skip: (page - 1) * pageSize,
            take: pageSize
        }),
        db.reminder.count({
            where: {
                invoice: {
                    userId: req.user?.id
                }
            }
        })
    ]);

    res.status(200).json({
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        reminders
    });
    return
});



export { sentreminder, getallremider }