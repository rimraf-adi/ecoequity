// every 30 seconds ka bucketed data, uska open high low closing calculate karna hai 
//open == [0], high == max, low == min, closing == [n-1] 

//every 30 seconds push messages (await thread here)
//ohlc calculate karo
//push it to db and pubsub
interface type_bucket {
    price: number,
    timestamp: string
}
import { Redis } from 'ioredis';
const client = new Redis();
const interval: number = 5; //seconds
let intervalBuckets: type_bucket[] = []

// let interval = 3;
let lastTimestamp = null;
function calculateOHLC(bucket : type_bucket[]) {
    if (bucket.length === 0) return;

    const open = bucket[0].price;
    const close = bucket[bucket.length - 1].price;
    const high = Math.max(...bucket.map(data  => data.price));
    const low = Math.min(...bucket.map(data => data.price));

    console.log('    ');
    console.log({open, close, high, low, timestamp: Math.floor(Date.now() / 1000)});


}

async function main() {
    while (true) {
        const data = await client.brpop('ohlc_calculator', 100000);
        const parsedData = JSON.parse(data[1]);
        console.log(parsedData)
        const currentTimestamp = parsedData.timestamp
        if (lastTimestamp === null) {
            lastTimestamp = currentTimestamp;
        }
        if (currentTimestamp - lastTimestamp >= interval) {
            calculateOHLC(intervalBuckets);
            intervalBuckets = [];
            lastTimestamp = currentTimestamp;
        }
        intervalBuckets.push(parsedData);
    }
}



main();
