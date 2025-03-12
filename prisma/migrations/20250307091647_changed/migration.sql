/*
  Warnings:

  - You are about to drop the column `aviaTicketsId` on the `tour_package` table. All the data in the column will be lost.
  - You are about to drop the column `discountsId` on the `tour_package` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tour_package" DROP CONSTRAINT "tour_package_aviaTicketsId_fkey";

-- DropForeignKey
ALTER TABLE "tour_package" DROP CONSTRAINT "tour_package_discountsId_fkey";

-- AlterTable
ALTER TABLE "avia_tickets" ADD COLUMN     "tourPackageId" INTEGER;

-- AlterTable
ALTER TABLE "discounts" ADD COLUMN     "tourPackageId" INTEGER;

-- AlterTable
ALTER TABLE "tour_package" DROP COLUMN "aviaTicketsId",
DROP COLUMN "discountsId";

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_tourPackageId_fkey" FOREIGN KEY ("tourPackageId") REFERENCES "tour_package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avia_tickets" ADD CONSTRAINT "avia_tickets_tourPackageId_fkey" FOREIGN KEY ("tourPackageId") REFERENCES "tour_package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
