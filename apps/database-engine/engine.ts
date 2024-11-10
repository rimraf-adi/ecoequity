import { Redis } from "ioredis";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const client = new Redis();

export class Engine {
  constructor() {
    console.log("database engine instantiated");
  }
  public async run() {
    while (1) {
      //{kind, market,price , quantity}, cp, bids , asks
      const msg = await client.brpop("database_engine", 10000);
      if (msg) {
        const data = JSON.parse(msg[1]);
        // console.log(data)
        const backup = await prisma.backup.create({
          data: {
            market : data.parsedOrder.market,
            curr_price: data.cp,
            bids: data.bids,
            asks: data.asks,
          },
        });
        console.log(backup)
        client.lpush("ohlc_calculator", JSON.stringify({price : data.cp, timestamp: Math.floor(Date.now()/1000), market : data.parsedOrder.market}));

 
      }
    }
  }
}
