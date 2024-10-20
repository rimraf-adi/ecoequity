import { Request, Response } from "express";
import { Redis } from "ioredis";
import { z } from "zod";
const client = new Redis();

const orderSchema = z.object({
    kind: z.enum(['buy', 'sell']),
    market: z.string(),
    price: z.number(),
    quantity: z.number(),
});

type Order = z.infer<typeof orderSchema>;

export const hello_world = (req: Request, res: Response) => { res.send('hello world') };


export const order = async (req: Request, res: Response) => {
    const result = orderSchema.safeParse(req.body);

    if (result.success) {
        const order: Order = result.data;
        
        try {
            await client.lpush('orders_from_api', JSON.stringify(order));

            res.status(200).send({ success: true, message: "Order placed in the queue", details: order });
        } catch (error) {
            res.status(500).send({ success: false, message: "Code dekh lawde, push has failed" });
        }
    } else {
        res.status(400).send({ success: false, message: "zod ne bakchodi kar di bhai", errors: result.error });
    }
};