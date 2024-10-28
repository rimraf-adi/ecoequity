-- CreateTable
CREATE TABLE "SolBackup" (
    "id" SERIAL NOT NULL,
    "curr_price" DOUBLE PRECISION NOT NULL,
    "bids" JSONB[],
    "asks" JSONB[],

    CONSTRAINT "SolBackup_pkey" PRIMARY KEY ("id")
);
