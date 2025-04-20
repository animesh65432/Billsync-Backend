import { Request, Response, NextFunction } from "express"
import { asyncfuncerrorpayload, GetmailOptionsTypes } from "../types"
const asyncerrorhandler = (func: asyncfuncerrorpayload) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(err => next(err));
  }
}

const GetmailOptions = ({ invoiceid, clientEmail, clientName, UserEmail, amount, dueDate }: GetmailOptionsTypes) => {
  const mailOptions = {
    from: UserEmail,
    to: clientEmail,
    subject: `⏰ Friendly Reminder: Invoice #${invoiceid} is Due Soon`,
    html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px;">
            <h2 style="color: #4f46e5;">Hello ${clientName},</h2>
            <p style="font-size: 16px; color: #333;">
              This is a gentle reminder that your invoice with the following details is due soon:
            </p>
      
            <ul style="list-style-type: none; padding: 0; font-size: 16px;">
              <li><strong>Invoice ID:</strong> ${invoiceid}</li>
              <li><strong>Amount:</strong> ₹${amount}</li>
              <li><strong>Due Date:</strong> ${new Date(dueDate).toDateString()}</li>
            </ul>
      
            <p style="margin-top: 20px; color: #444;">
              Kindly ensure the payment is completed before the due date. If you've already paid, please ignore this message.
            </p>
      
            <p style="margin-top: 30px; font-size: 14px; color: #999;">
              Thanks & Regards,<br />
              <strong>${UserEmail}</strong>
            </p>
          </div>
        `,
  };

  return mailOptions

}



export { asyncerrorhandler, GetmailOptions }

