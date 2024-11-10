
import { type_bucket, type_OHLC, type_ParsedData } from "./types";
export class Calculator {
    intervalBuckets : type_bucket[]
    client
    constructor(client){
        console.log('calculator instantiated');
        this.intervalBuckets = []
        this.client = client

    }


    public calculate(parsedData : type_ParsedData, interval : number){
        let lastTimestamp = null;
        const currentTimestamp = parsedData.timestamp
        if (lastTimestamp === null) {
            lastTimestamp = currentTimestamp;
        }
        if (currentTimestamp - lastTimestamp >= interval) {
            const ohlc = this.calculateOHLC(this.intervalBuckets);
            this.pushIntoDatabase(ohlc, parsedData.market)
            this.intervalBuckets = [];
            lastTimestamp = currentTimestamp;
        }
       this.intervalBuckets.push(parsedData);
    }


    

    private calculateOHLC(bucket: type_bucket[]) {
        if (bucket.length === 0) return;

        const open = bucket[0].price;
        const close = bucket[bucket.length - 1].price;
        const high = Math.max(...bucket.map(data => data.price));
        const low = Math.min(...bucket.map(data => data.price));

        console.log('    ');
        return { open, close, high, low, timestamp: Math.floor(Date.now() / 1000) }


    }

    private async pushIntoDatabase(ohlc : type_OHLC, market : string ){
        const ohlcData = await this.client.ohlc.create({
            data : {
                open : ohlc.open,
                close: ohlc.close,
                high : ohlc.high,
                low : ohlc.low,
                timestamp : ohlc.timestamp,
                market : market

            }
        })
        console.log(ohlcData)
    }


}