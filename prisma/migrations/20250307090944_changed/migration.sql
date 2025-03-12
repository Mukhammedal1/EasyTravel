/*
  Warnings:

  - You are about to drop the column `insuranceId` on the `tour_package` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tour_package" DROP CONSTRAINT "tour_package_insuranceId_fkey";

-- AlterTable
ALTER TABLE "insurance" ADD COLUMN     "tourPackageId" INTEGER;

-- AlterTable
ALTER TABLE "tour_package" DROP COLUMN "insuranceId";

-- AddForeignKey
ALTER TABLE "insurance" ADD CONSTRAINT "insurance_tourPackageId_fkey" FOREIGN KEY ("tourPackageId") REFERENCES "tour_package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
