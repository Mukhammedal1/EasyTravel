-- AlterTable
ALTER TABLE "contracts" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "travelers" ALTER COLUMN "createdAt" DROP NOT NULL;
