import express, { Request, Response } from "express";
import { Redis } from "ioredis";
import { z } from "zod";

const app = express();
const client = new Redis();

app.use(express.json());

const orderSchema = z.object({
    kind: z.enum(['buy', 'sell']),
    market: z.string(),
    price: z.number(),
    quantity: z.number(),
});

type Order = z.infer<typeof orderSchema>;

app.get('/', (req: Request, res: Response) => {
    res.send('hello world');
});

app.post('/api/v1/order', async (req: Request, res: Response) => {
    const result = orderSchema.safeParse(req.body);

    if (result.success) {
        const order: Order = result.data;

        try {
            await client.lpush('orders', JSON.stringify(order));
            res.status(200).send({ success: true, message: "Order placed in the queue", details: order });
        } catch (error) {
            res.status(500).send({ success: false, message: "Code dekh lawde, push has failed" });
        }
    } else {
        res.status(400).send({ success: false, message: "zod ne bakchodi kar di bhai", errors: result.error });
    }
});

app.listen(8000, () => {
    console.log('running on 8000');
});
