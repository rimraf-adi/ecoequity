import { type_orderbook, type_Price, type_AskSide, type_BidSide, type_Quantity, type_UserBalances, type_Market, type_Depth } from "./types"
import { sol_usdc_ob, eth_usdc_ob } from "./orderbook";
import { Redis } from "ioredis";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()
export const client = new Redis()
export class Engine {
    orderbooks: Map<type_Market, type_orderbook>
    current_balance: type_UserBalances[];


    constructor() {
        this.orderbooks = new Map()
        this.current_balance = []

    }

    public pushBooks(market: type_Market, ob: type_orderbook) {
        this.orderbooks.set(market, ob);
    }

    public async run() {
        while (1) {
            const message = await client.brpop('orders_from_api', 1000);
            console.log(message)
            if (message) {
                this.executeTrade(message)


            }
            else console.error('invalid message from queue');
        }
    }

    private async executeTrade(message: [string, string]){
        if (message) {
            //extract msg
            const parsedMessage = JSON.parse(message[1]);
            const { kind, market, price, quantity } = parsedMessage;
            //get orderbook
            const ob: type_orderbook | any = this.orderbooks.get(market);
            if (ob) {
                //buy/sell
                if (kind == 'buy') ob.buy(price, quantity);
                else ob.sell(price, quantity)
                //printing for debugging purposes
                // ob.printDepth();
                
                const depth : type_Depth = ob.getDepth();
                const object = await prisma.solBackup.create({
                    data : {
                        curr_price : depth.current_price,
                        bids : depth.bids,
                        asks : depth.asks


                    }
                })
                console.log(object);
            }
            else console.error('invalid market')
        }
        else console.error('empty queue!')
    }



    private async publishMessage(channel: string, message: string) {
        try { await client.publish(channel, message) }
        catch (error) { console.log(error, 'lafda hogaya re, redis error!') }


    }
}


