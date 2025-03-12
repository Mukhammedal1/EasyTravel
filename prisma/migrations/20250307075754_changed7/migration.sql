/*
  Warnings:

  - You are about to drop the column `hotelsId` on the `reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_hotelsId_fkey";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "hotelsId",
ADD COLUMN     "tourPackageId" INTEGER;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tourPackageId_fkey" FOREIGN KEY ("tourPackageId") REFERENCES "tour_package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
