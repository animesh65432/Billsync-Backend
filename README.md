# Duetrack Backend

This is the backend API for **Duetrack**, a payment and follow-up management tool tailored for freelancers, small businesses, and SaaS founders. It handles everything from authentication, email reminders, cron jobs, and user payment tracking.

Built with **Node.js**, **Express**, **TypeScript**, and **Prisma ORM**, this server powers the frontend via secure RESTful APIs.

---

## 🚀 Tech Stack

| Tech                   | Purpose                                  |
|------------------------|-------------------------------------------|
| **Node.js + Express**  | Backend server and routing                |
| **TypeScript**         | Type safety and scalability               |
| **Prisma ORM**         | Database interaction                      |
| **PostgreSQL / MySQL** | Persistent database (via Prisma)          |
| **Passport**           | Authentication (Google OAuth 2.0)         |
| **JWT**                | Secure token-based sessions               |
| **Nodemailer**         | Sending payment reminders                 |
| **node-cron**          | Scheduled jobs for reminders              |

---

## 📁 Folder Structure

backend/
├── src/
| ├── db/prisma/ #for prisma
│ ├── controllers/ # API logic for auth, payments, etc.
│ ├── middleware/ # JWT, error handlers, session checkers
│ ├── routes/ # Express route definitions
│ ├── services/ # Core logic (email, reminders, etc.)
│ ├── utils/ # Utility functions (tokens, dates)
│ └── index.ts # Entry point



 Installation
1. Clone the Repository
git clone https://github.com/animesh65432/Apiidea-backend

##2 .Install Dependencies

npm install

##3 Development

npm run start
