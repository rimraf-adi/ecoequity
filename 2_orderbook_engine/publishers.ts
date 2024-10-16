import { type_Market } from "./types";
import { client } from "./engine";
class Publisher {
    market: type_Market

    constructor(market: type_Market) { this.market = market }

    // Streams will be of the form MARKET@TRADES, MARKET@DEPTH, MARKET@PRICE
    public async publishMessage(channel: string, message: string) {
        try { await client.publish(channel, message) }
        catch (error) { console.log(error, 'lafda hogaya re, redis error!') }


    }

}