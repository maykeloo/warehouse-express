/*
  Warnings:

  - Added the required column `password` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Warehouseman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Warehouseman" ADD COLUMN     "password" TEXT NOT NULL;
