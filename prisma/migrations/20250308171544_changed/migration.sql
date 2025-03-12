/*
  Warnings:

  - You are about to drop the column `tourPackageId` on the `discounts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "discounts" DROP CONSTRAINT "discounts_tourPackageId_fkey";

-- AlterTable
ALTER TABLE "discounts" DROP COLUMN "tourPackageId";

-- AlterTable
ALTER TABLE "tour_package" ADD COLUMN     "discountsId" INTEGER;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_discountsId_fkey" FOREIGN KEY ("discountsId") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
