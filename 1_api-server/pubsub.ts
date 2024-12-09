import { Redis } from "ioredis";

class Publisher {
    publisher : Redis
    constructor(){
        this.publisher = new Redis();
    }

    public publish(topic : string, data : string){
        this.publisher.publish(topic,data);

    }
};


export const publisher = new Publisher();