// every 30 seconds ka bucketed data, uska open high low closing calculate karna hai 
//open == [0], high == max, low == min, closing == [n-1] 

//every 30 seconds push messages (await thread here)
//ohlc calculate karo
//push it to db and pubsub
import { Calculator } from './calculator';
import { type_bucket } from './types';
import { Redis } from 'ioredis';
const client = new Redis();
const interval: number = 5; //seconds
// 
let intervalBuckets: type_bucket[] = []


const calculatorSystem = new Calculator()


async function main() {
    while (true) {
        const data = await client.brpop('ohlc_calculator', 100000);
        const parsedData = JSON.parse(data[1]);
        console.log(parsedData)
        calculatorSystem.calculate(parsedData, interval)
       

    }
}

main();
