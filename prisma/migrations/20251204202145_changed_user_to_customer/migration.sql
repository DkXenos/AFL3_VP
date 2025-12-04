/*
  Warnings:

  - You are about to alter the column `phone` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(20);
