/*
  Warnings:

  - You are about to alter the column `hashed_token` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.

*/
-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "hashed_token" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "is_active" SET DEFAULT false;

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "hashed_token" VARCHAR(500),
    "is_creator" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_visa_required" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" INTEGER,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visa_policy" (
    "id" SERIAL NOT NULL,
    "visa_proceccing_time" INTEGER NOT NULL,
    "duration_month" INTEGER NOT NULL,
    "countryId" INTEGER,

    CONSTRAINT "visa_policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance" (
    "id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_to" TIMESTAMP(3) NOT NULL,
    "insurance_roles" TEXT NOT NULL,

    CONSTRAINT "insurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" SERIAL NOT NULL,
    "discount_value" INTEGER NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_to" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avia_tickets" (
    "id" SERIAL NOT NULL,
    "aviacompany_name" TEXT NOT NULL,
    "departure_airport" TEXT NOT NULL,
    "arrival_airport" TEXT NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "baggage" INTEGER NOT NULL,
    "ticket_class" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "extra_services" TEXT NOT NULL,

    CONSTRAINT "avia_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_package" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "duration" INTEGER NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_to" TIMESTAMP(3) NOT NULL,
    "available_seats" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cityId" INTEGER,
    "insuranceId" INTEGER,
    "discountsId" INTEGER,
    "aviaTicketsId" INTEGER,

    CONSTRAINT "tour_package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_package_city" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER,
    "tourPackageId" INTEGER,

    CONSTRAINT "tour_package_city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stars_level" INTEGER NOT NULL,
    "price_per_night" BIGINT NOT NULL,
    "address" TEXT NOT NULL,
    "checkin_time" TIMESTAMP(3) NOT NULL,
    "checkout_time" TIMESTAMP(3) NOT NULL,
    "includes_services" TEXT NOT NULL,
    "cityId" INTEGER,
    "tourPackageId" INTEGER,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "customersId" INTEGER,
    "hotelsId" INTEGER,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "hotelsId" INTEGER,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "terms" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" INTEGER,
    "ordersId" INTEGER,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "total_price" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customersId" INTEGER,
    "tourPackageId" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "amount" BIGINT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "contractsId" INTEGER,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travelers" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "passport_info" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "is_exist_visa" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "travelers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travelers_order" (
    "id" SERIAL NOT NULL,
    "ordersId" INTEGER,
    "travelersId" INTEGER,

    CONSTRAINT "travelers_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traveler_visa_info" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "visa_type" TEXT NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "travelersId" INTEGER,

    CONSTRAINT "traveler_visa_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "travelers_email_key" ON "travelers"("email");

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visa_policy" ADD CONSTRAINT "visa_policy_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_discountsId_fkey" FOREIGN KEY ("discountsId") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package" ADD CONSTRAINT "tour_package_aviaTicketsId_fkey" FOREIGN KEY ("aviaTicketsId") REFERENCES "avia_tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package_city" ADD CONSTRAINT "tour_package_city_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_package_city" ADD CONSTRAINT "tour_package_city_tourPackageId_fkey" FOREIGN KEY ("tourPackageId") REFERENCES "tour_package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_tourPackageId_fkey" FOREIGN KEY ("tourPackageId") REFERENCES "tour_package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_hotelsId_fkey" FOREIGN KEY ("hotelsId") REFERENCES "hotels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_hotelsId_fkey" FOREIGN KEY ("hotelsId") REFERENCES "hotels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_tourPackageId_fkey" FOREIGN KEY ("tourPackageId") REFERENCES "tour_package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_contractsId_fkey" FOREIGN KEY ("contractsId") REFERENCES "contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelers_order" ADD CONSTRAINT "travelers_order_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelers_order" ADD CONSTRAINT "travelers_order_travelersId_fkey" FOREIGN KEY ("travelersId") REFERENCES "travelers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveler_visa_info" ADD CONSTRAINT "traveler_visa_info_travelersId_fkey" FOREIGN KEY ("travelersId") REFERENCES "travelers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
