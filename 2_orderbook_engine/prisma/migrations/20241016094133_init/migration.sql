-- CreateTable
CREATE TABLE "Backup" (
    "id" SERIAL NOT NULL,
    "curr_price" DOUBLE PRECISION NOT NULL,
    "bids" DOUBLE PRECISION[],
    "asks" DOUBLE PRECISION[],

    CONSTRAINT "Backup_pkey" PRIMARY KEY ("id")
);
