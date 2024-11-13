import { Redis } from "ioredis";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const client = new Redis();

export class Engine {
  intervalBuckets: any[];
  lastTimestamp: number | null;

  constructor() {
    console.log("database engine instantiated");
    this.intervalBuckets = [];
    this.lastTimestamp = null;
  }

  public async run() {
    while (1) {
      const msg = await client.brpop("database_engine", 10000);
      if (msg) {
        const data = JSON.parse(msg[1]);
        this.calculate(data, 10);

        const backup = await prisma.backup.create({
          data: {
            market: data.parsedOrder.market,
            curr_price: data.cp,
            bids: data.bids,
            asks: data.asks,
          },
        });
        // console.log(backup);
      }
    }
  }

  private calculate(data: any, interval: number) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    this.intervalBuckets.push({ price: data.cp, timestamp: currentTimestamp });

    if (this.lastTimestamp === null) this.lastTimestamp = currentTimestamp;
    if (currentTimestamp - this.lastTimestamp >= interval) {
      const ohlc = this.calculateOHLC(this.intervalBuckets);
      console.log(ohlc);

      this.intervalBuckets = [];
      this.lastTimestamp = currentTimestamp;
    }
  }

  private calculateOHLC(bucket: any) {
    if (bucket.length === 0) return;

    const open = bucket[0].price;
    const close = bucket[bucket.length - 1].price;
    const high = Math.max(...bucket.map((data) => data.price));
    const low = Math.min(...bucket.map((data) => data.price));

    return { open, close, high, low, timestamp: Math.floor(Date.now() / 1000) };
  }
}
