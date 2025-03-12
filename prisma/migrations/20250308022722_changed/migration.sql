/*
  Warnings:

  - Made the column `countryId` on table `city` required. This step will fail if there are existing NULL values in that column.
  - Made the column `adminId` on table `contracts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ordersId` on table `contracts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tourPackageId` on table `discounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cityId` on table `hotels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hotelsId` on table `images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customersId` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tourPackageId` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contractsId` on table `payments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customersId` on table `reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tourPackageId` on table `reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cityId` on table `tour_package` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aviaTicketsId` on table `tour_package` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hotelsId` on table `tour_package` required. This step will fail if there are existing NULL values in that column.
  - Made the column `insuranceId` on table `tour_package` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cityId` on table `tour_package_city` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tourPackageId` on table `tour_package_city` required. This step will fail if there are existing NULL values in that column.
  - Made the column `travelersId` on table `traveler_visa_info` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ordersId` on table `travelers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ordersId` on table `travelers_order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `travelersId` on table `travelers_order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countryId` on table `visa_policy` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_countryId_fkey";

-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_adminId_fkey";

-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_ordersId_fkey";

-- DropForeignKey
ALTER TABLE "discounts" DROP CONSTRAINT "discounts_tourPackageId_fkey";

-- DropForeignKey
ALTER TABLE "hotels" DROP CONSTRAINT "hotels_cityId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_hotelsId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customersId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_tourPackageId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_contractsId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_customersId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_tourPackageId_fkey";

-- DropForeignKey
ALTER TABLE "tour_package" DROP CONSTRAINT "tour_package_aviaTicketsId_fkey";

-- DropForeignKey
ALTER TABLE "tour_package" DROP CONSTRAINT "tour_package_cityId_fkey";

-- DropForeignKey
ALTER TABLE "tour_package" DROP CONSTRAINT "tour_package_hotelsId_fkey";

-- DropForeignKey
ALTER TABLE "tour_package" DROP CONSTRAINT "tour_package_insuranceId_fkey";

-- DropForeignKey
ALTER TABLE "tour_package_city" DROP CONSTRAINT "tour_package_city_cityId_fkey";

-- DropForeignKey
ALTER TABLE "tour_package_city" DROP CONSTRAINT "tour_package_city_tourPackageId_fkey";

-- DropForeignKey
ALTER TABLE "traveler_visa_info" DROP CONSTRAINT "traveler_visa_info_travelersId_fkey";

-- DropForeignKey
ALTER TABLE "travelers" DROP CONSTRAINT "travelers_ordersId_fkey";

-- DropForeignKey
ALTER TABLE "travelers_order" DROP CONSTRAINT "travelers_order_ordersId_fkey";

-- DropForeignKey
ALTER TABLE "travelers_order" DROP CONSTRAINT "travelers_order_travelersId_fkey";

-- DropForeignKey
ALTER TABLE "visa_policy" DROP CONSTRAINT "visa_policy_countryId_fkey";

-- AlterTable
ALTER TABLE "city" ALTER COLUMN "countryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "contracts" ALTER COLUMN "adminId" SET NOT NULL,
ALTER COLUMN "ordersId" SET NOT NULL;

-- AlterTable
ALTER TABLE "discounts" ALTER COLUMN "tourPackageId" SET NOT NULL;

-- AlterTable
ALTER TABLE "hotels" ALTER COLUMN "cityId" SET NOT NULL;

-- AlterTable
ALTER TABLE "images" ALTER COLUMN "hotelsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "customersId" SET NOT NULL,
ALTER COLUMN "tourPackageId" SET NOT NULL;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "contractsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "customersId" SET NOT NULL,
ALTER COLUMN "tourPackageId" SET NOT NULL;

-- AlterTable
ALTER TABLE "tour_package" ALTER COLUMN "cityId" SET NOT NULL,
ALTER COLUMN "aviaTicketsId" SET NOT NULL,
ALTER COLUMN "hotelsId" SET NOT NULL,
ALTER COLUMN "insuranceId" SET NOT NULL;

-- AlterTable
ALTER TABLE "tour_package_city" ALTER COLUMN "cityId" SET NOT NULL,
ALTER COLUMN "tourPackageId" SET NOT NULL;

-- AlterTable
ALTER TABLE "traveler_visa_info" ALTER COLUMN "travelersId" SET NOT NULL;

-- AlterTable
ALTER TABLE "travelers" ALTER COLUMN "ordersId" SET NOT NULL;

-- AlterTable
ALTER TABLE "travelers_order" ALTER COLUMN "ordersId" SET NOT NULL,
ALTER COLUMN "travelersId" SET NOT NULL;

-- AlterTable
ALTER TABLE "visa_policy" ALTER COLUMN "countryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visa_policy" ADD CONSTRAINT "visa_policy_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_tourPackageId_fkey" FOREIGN KEY ("tourPackageId") REFERENCES "tour_package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_aviaTicketsId_fkey" FOREIGN KEY ("aviaTicketsId") REFERENCES "avia_tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_hotelsId_fkey" FOREIGN KEY ("hotelsId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package_city" ADD CONSTRAINT "tour_package_city_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package_city" ADD CONSTRAINT "tour_package_city_tourPackageId_fkey" FOREIGN KEY ("tourPackageId") REFERENCES "tour_package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tourPackageId_fkey" FOREIGN KEY ("tourPackageId") REFERENCES "tour_package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_hotelsId_fkey" FOREIGN KEY ("hotelsId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_tourPackageId_fkey" FOREIGN KEY ("tourPackageId") REFERENCES "tour_package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_contractsId_fkey" FOREIGN KEY ("contractsId") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelers" ADD CONSTRAINT "travelers_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelers_order" ADD CONSTRAINT "travelers_order_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelers_order" ADD CONSTRAINT "travelers_order_travelersId_fkey" FOREIGN KEY ("travelersId") REFERENCES "travelers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveler_visa_info" ADD CONSTRAINT "traveler_visa_info_travelersId_fkey" FOREIGN KEY ("travelersId") REFERENCES "travelers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
