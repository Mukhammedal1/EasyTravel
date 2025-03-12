/*
  Warnings:

  - A unique constraint covering the columns `[activation_link]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customers_activation_link_key" ON "customers"("activation_link");
