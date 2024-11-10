-- CreateTable
CREATE TABLE "backup" (
    "id" SERIAL NOT NULL,
    "market" TEXT NOT NULL,
    "curr_price" DOUBLE PRECISION NOT NULL,
    "bids" JSONB[],
    "asks" JSONB[],

    CONSTRAINT "backup_pkey" PRIMARY KEY ("id")
);
