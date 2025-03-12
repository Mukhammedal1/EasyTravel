/*
  Warnings:

  - Made the column `is_exist_visa` on table `travelers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "travelers" ALTER COLUMN "is_exist_visa" SET NOT NULL,
ALTER COLUMN "is_exist_visa" DROP DEFAULT;
