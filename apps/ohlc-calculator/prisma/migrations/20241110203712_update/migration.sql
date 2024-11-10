-- CreateTable
CREATE TABLE "ohlc" (
    "id" SERIAL NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "market" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ohlc_id_key" ON "ohlc"("id");
