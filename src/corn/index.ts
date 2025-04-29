import { db } from "../db";
import { GetmailOptions, tellToFounder } from "../Utils";
import { nodemailer } from "../services";
import config from "../config";

const rundaily = async () => {
    try {
        const invoices = await db.invoice.findMany({
            where: {
                status: "PENDING",
                reminderSent: false,
                dueDate: {
                    lte: new Date(new Date().setDate(new Date().getDate() + 1))
                }
            },
            include: {
                user: true
            }
        });

        const sendMailPromises = invoices.map(async (invoice) => {
            await nodemailer.sendMail(
                GetmailOptions({
                    invoiceid: invoice.id,
                    clientEmail: invoice.Mail,
                    dueDate: invoice.dueDate,
                    amount: invoice.amount,
                    clientName: invoice.clientName,
                    UserEmail: invoice.user.email
                })
            );

            const founderEmail = invoice.user.email === "test@gmail.com" ? config.NODEMAILER_EMAIL : invoice.user.email

            await nodemailer.sendMail(tellToFounder({
                userid: invoice.userId,
                username: invoice.clientName,
                foundermail: founderEmail!
            }))

            await db.invoice.update({
                where: { id: invoice.id },
                data: { reminderSent: true }
            });
        });

        await Promise.all(sendMailPromises);

        console.log("✅ Daily reminders sent.");
    } catch (error) {
        console.error("❌ Daily reminder failed:", error);
    }
};

export default rundaily;
