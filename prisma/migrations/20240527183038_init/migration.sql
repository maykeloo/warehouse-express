-- CreateTable
CREATE TABLE "Warehouseman" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Warehouseman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Warehouseman_email_key" ON "Warehouseman"("email");
