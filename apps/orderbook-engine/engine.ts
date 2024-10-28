import { type_orderbook, type_Price, type_AskSide, type_BidSide, type_Quantity, type_UserBalances, type_Market, type_Depth } from "./types"
import { sol_usdc_ob, eth_usdc_ob } from "./orderbook";
// import { solPublisher, ethPublisher } from "./publisher";
import { Redis } from "ioredis";

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
            // console.log(message)
            if (message) {
                this.tradeAndPush(message)


            }
            else console.error('invalid message from queue');
        }
    }

    private async tradeAndPush(message: [string, string]){
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
                const depth : type_Depth = ob.getDepth();
                // console.log(depth)
                const bids = ob.bids;
                const asks = ob.asks;
                const cp = ob.currentPrice;
                client.lpush('database_engine', JSON.stringify({parsedMessage, cp, bids, asks}))
                //TODO, generalise the publisher message
                client.publish('DEPTH',JSON.stringify({asks,bids}))

            }
            else console.error('invalid market')
        }
        else console.error('empty queue!')
    }



}


