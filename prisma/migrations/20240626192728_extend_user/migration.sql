/*
  Warnings:

  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `Warehouseman` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Warehouseman" DROP CONSTRAINT "Warehouseman_userId_fkey";

-- DropForeignKey
ALTER TABLE "Warehouseman" DROP CONSTRAINT "Warehouseman_warehouseId_fkey";

-- DropIndex
DROP INDEX "Employee_email_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password";

-- DropTable
DROP TABLE "Warehouseman";
