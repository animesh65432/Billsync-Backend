/*
  Warnings:

  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reminder` DROP FOREIGN KEY `Reminder_invoiceId_fkey`;

-- DropIndex
DROP INDEX `Reminder_invoiceId_fkey` ON `Reminder`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `Password`,
    ADD COLUMN `password` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Reminder` ADD CONSTRAINT `Reminder_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
