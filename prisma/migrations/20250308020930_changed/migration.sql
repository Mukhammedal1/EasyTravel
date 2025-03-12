-- AlterTable
ALTER TABLE "travelers" ALTER COLUMN "is_exist_visa" DROP NOT NULL,
ALTER COLUMN "is_exist_visa" SET DEFAULT false;
