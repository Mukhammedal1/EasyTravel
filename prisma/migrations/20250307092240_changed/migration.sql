/*
  Warnings:

  - Added the required column `price` to the `insurance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "insurance" ADD COLUMN     "price" BIGINT NOT NULL;
