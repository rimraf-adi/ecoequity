import axios from 'axios';

const requestsPerSecond = 1;
const totalRequests = 5;

function generateRandomOrder() {
    const market = 'sol_usdc'
    const kinds = ['buy', 'sell'];
    const price = Math.floor(Math.random() * (149 - 144 + 1)) + 140;
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    const quantity = Math.floor(Math.random() * 10) + 1;
    
    return {
        kind,
        market,
        price,
        quantity
    };
}

async function sendRequests() {
    let requestsSent = 0;

    const intervalId = setInterval(async () => {
        // if (requestsSent >= totalRequests) {
        //     clearInterval(intervalId);
        //     console.log(`Finished sending ${totalRequests} requests.`);
        //     return;
        // }

        const data = generateRandomOrder();

        try {
            const response = await axios.post('http://localhost:8000/api/v1/order', data);
            console.log(`Response for Order ${data}:`, response.data);
        } catch (error ) {
            console.error(`Error sending Order ${data}:`, error);
        }

        requestsSent++;
    }, 100);
}

sendRequests();
