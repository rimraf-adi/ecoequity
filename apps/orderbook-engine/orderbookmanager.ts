import { type_Orderbook , type_Market} from "./types";
import { Orderbook } from "./orderbook";
export class OrderbookManager {
    orderbooks : Map<type_Market, type_Orderbook>
    
    
    constructor(){
        console.log('orderbook manager instantiated');
        this.orderbooks = new Map<type_Market, type_Orderbook>;
    }

    public push (market: type_Market ,ob : type_Orderbook){
        this.orderbooks.set(market, ob);

    }
    public handleMissingOrderbooks(market : type_Market){
        const tempOB : type_Orderbook = new Orderbook([],[],market)
        obm.push(market, tempOB);
        return tempOB;
        
    }

};



export const obm = new OrderbookManager();