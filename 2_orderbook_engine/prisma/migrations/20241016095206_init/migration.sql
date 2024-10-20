/*
  Warnings:

  - You are about to drop the `Backup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Backup";

-- CreateTable
CREATE TABLE "SolBackup" (
    "id" SERIAL NOT NULL,
    "curr_price" DOUBLE PRECISION NOT NULL,
    "bids" DOUBLE PRECISION[],
    "asks" DOUBLE PRECISION[],
    "market" TEXT NOT NULL,

    CONSTRAINT "SolBackup_pkey" PRIMARY KEY ("id")
);
