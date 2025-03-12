/*
  Warnings:

  - You are about to drop the column `start_date` on the `contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "start_date",
ADD COLUMN     "payment_deadline" TIMESTAMP(3),
ALTER COLUMN "end_date" DROP NOT NULL;
