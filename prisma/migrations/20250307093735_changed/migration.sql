/*
  Warnings:

  - You are about to drop the column `tourPackageId` on the `avia_tickets` table. All the data in the column will be lost.
  - You are about to drop the column `tourPackageId` on the `hotels` table. All the data in the column will be lost.
  - You are about to drop the column `tourPackageId` on the `insurance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "avia_tickets" DROP CONSTRAINT "avia_tickets_tourPackageId_fkey";

-- DropForeignKey
ALTER TABLE "hotels" DROP CONSTRAINT "hotels_tourPackageId_fkey";

-- DropForeignKey
ALTER TABLE "insurance" DROP CONSTRAINT "insurance_tourPackageId_fkey";

-- AlterTable
ALTER TABLE "avia_tickets" DROP COLUMN "tourPackageId";

-- AlterTable
ALTER TABLE "hotels" DROP COLUMN "tourPackageId";

-- AlterTable
ALTER TABLE "insurance" DROP COLUMN "tourPackageId";

-- AlterTable
ALTER TABLE "tour_package" ADD COLUMN     "aviaTicketsId" INTEGER,
ADD COLUMN     "hotelsId" INTEGER,
ADD COLUMN     "insuranceId" INTEGER;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_aviaTicketsId_fkey" FOREIGN KEY ("aviaTicketsId") REFERENCES "avia_tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_hotelsId_fkey" FOREIGN KEY ("hotelsId") REFERENCES "hotels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
