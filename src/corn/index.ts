import { db } from "../db";
import { GetmailOptions } from "../Utils";
import { nodemailer } from "../services";

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
