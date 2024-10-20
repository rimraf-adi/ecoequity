-- CreateTable
CREATE TABLE "TimeSeriesSol" (
    "id" SERIAL NOT NULL,
    "current_price" DOUBLE PRECISION NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeSeriesSol_pkey" PRIMARY KEY ("id")
);
