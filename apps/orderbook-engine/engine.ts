import { type_Orderbook, type_Price, type_AskSide, type_BidSide, type_Quantity, type_UserBalances, type_Market, type_Depth } from "./types"
import { obm } from "./orderbookmanager";
// import { solPublisher, ethPublisher } from "./publisher";
import { Redis } from "ioredis";
import { Orderbook } from "./orderbook";

export const client = new Redis()
export class Engine {
    // orderbooks: Map<type_Market, type_Orderbook>
    // current_balance: type_UserBalances[];


    constructor() {
        // this.orderbooks = new Map()
        // this.current_balance = []
        console.log('chug chug! engine running!')

    }

    public async run() {
        while (1) {
            const order = await client.brpop('orders_from_api', 10000);

            // console.log(message)
            if (!order) { console.error('inside engine, message nahi aaya'); return;}

            // this.execute(order, newBook);


            //extract msg
            const parsedOrder = JSON.parse(order[1]);
            const { kind, market, price, quantity } = parsedOrder;
            //get orderbook
            const ob: type_Orderbook | any = obm.orderbooks.get(market) ? obm.orderbooks.get(market) : obm.handleMissingOrderbooks(market)

            if (ob) {

                //buy/sell
                if (kind == 'buy') ob.buy(price, quantity);
                else ob.sell(price, quantity)

                //TODO : move this logic somewhere else
                // console.log(depth)
                const bids = ob.bids;
                const asks = ob.asks;
                const cp = ob.currentPrice;
                client.lpush('database_engine', JSON.stringify({ parsedOrder, cp, bids, asks }))
                //TODO, generalise the publisher message
                client.publish('DEPTH', JSON.stringify({ asks, bids }))

            }

        }

    }
}



