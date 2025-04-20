import { Router } from "express"
import { auth } from "../../middlewares"
import { GetInvoices, CreateInvoice, UpdateInvoice, DeleteInvoice, Mark_as_paid, GetInvoice } from "../../controllers"

const Invoices = Router()
Invoices.get("/GetInvoices", auth, GetInvoices)
Invoices.get("/GetInvoice", auth, GetInvoice)
Invoices.post("/create", auth, CreateInvoice)
Invoices.put("/update", auth, UpdateInvoice)
Invoices.delete("/delete", auth, DeleteInvoice)
Invoices.put("/markaspaid", auth, Mark_as_paid)

export default Invoices
