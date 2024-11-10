/*
  Warnings:

  - You are about to drop the `SolBackup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeSeriesSol` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SolBackup";

-- DropTable
DROP TABLE "TimeSeriesSol";

-- CreateTable
CREATE TABLE "backup" (
    "id" SERIAL NOT NULL,
    "market" TEXT NOT NULL,
    "curr_price" DOUBLE PRECISION NOT NULL,
    "bids" JSONB[],
    "asks" JSONB[],

    CONSTRAINT "backup_pkey" PRIMARY KEY ("id")
);
