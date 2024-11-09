// every 30 seconds ka bucketed data, uska open high low closing calculate karna hai 
//open == [0], high == max, low == min, closing == [n-1] 

//every 30 seconds push messages (await thread here)
//ohlc calculate karo, push it to db and pubsub

import { Redis } from 'ioredis';
const client = new Redis();





async function main() {
    while (1) {
        const data = await client.brpop('ohlc_calculator', 100000);
        console.log(data[1]);
    }


}


main();