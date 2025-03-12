/*
  Warnings:

  - You are about to drop the column `total_price` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "total_price";

-- AlterTable
ALTER TABLE "travelers" ADD COLUMN     "ordersId" INTEGER;

-- AddForeignKey
ALTER TABLE "travelers" ADD CONSTRAINT "travelers_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
