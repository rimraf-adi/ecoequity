/*
  Warnings:

  - You are about to drop the column `market` on the `SolBackup` table. All the data in the column will be lost.
  - The `bids` column on the `SolBackup` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `asks` column on the `SolBackup` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SolBackup" DROP COLUMN "market",
DROP COLUMN "bids",
ADD COLUMN     "bids" JSONB[],
DROP COLUMN "asks",
ADD COLUMN     "asks" JSONB[];
