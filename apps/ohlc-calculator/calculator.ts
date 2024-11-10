import { type_bucket, type_ParsedData } from "./types";
export class Calculator {
    intervalBuckets : type_bucket[]
    constructor(){
        console.log('calculator instantiated');
        this.intervalBuckets = []

    }


    public calculate(parsedData : type_ParsedData, interval : number){
        let lastTimestamp = null;
        const currentTimestamp = parsedData.timestamp
        if (lastTimestamp === null) {
            lastTimestamp = currentTimestamp;
        }
        if (currentTimestamp - lastTimestamp >= interval) {
            this.calculateOHLC(this.intervalBuckets);
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
        console.log({ open, close, high, low, timestamp: Math.floor(Date.now() / 1000) });


    }


}