import { type_Orderbook, type_Price, type_AskSide, type_BidSide, type_Quantity, type_Depth } from "./types"

export class Orderbook {

    bids: type_BidSide;
    asks: type_AskSide;
    currentPrice: type_Price;
    market: string

    static bidComparator(a: number[], b: number[]): number {
        return b[0] - a[0];
    }

    static askComparator(a: number[], b: number[]): number {
        return a[0] - b[0];
    }

    constructor(bids: type_BidSide, asks: type_AskSide, market: string) {
        this.asks = asks.sort(Orderbook.askComparator);
        this.market = market;
        this.bids = bids.sort(Orderbook.bidComparator);
        this.currentPrice = 0;
    }

    public printDepth(): void {
        console.log("bids                 asks")
        for (let i = 0; i < Math.max(this.bids.length, this.asks.length); i++) {
            const bid = this.bids[i] ? `${this.bids[i][0]} (${this.bids[i][1]})` : "      ";
            const ask = this.asks[i] ? `${this.asks[i][0]} (${this.asks[i][1]})` : "      ";
            console.log(`${bid}   |   ${ask}`);
        }
        console.log(this.currentPrice)
    }

    public getDepth(): type_Depth {
        const depth: any = {
            bids: [],
            asks: [],
            current_price: Number
        };

        for (let i = 0; i < Math.max(this.bids.length, this.asks.length); i++) {
            const bid = this.bids[i] ? { price: this.bids[i][0], quantity: this.bids[i][1] } : 0;
            const ask = this.asks[i] ? { price: this.asks[i][0], quantity: this.asks[i][1] } : 0;

            if (bid) depth.bids.push(bid);
            if (ask) depth.asks.push(ask);
            depth.current_price = this.currentPrice;
        }

        return depth;
    }

    public buy(price: type_Price, quantity: type_Quantity): void {
        if (!this.bids.length) { this.bids.push([price, quantity]); return; };

        const bestAsk: type_Price[] = this.asks[0];
        const bestBid: type_Price[] = this.bids[0];

        if (price >= bestAsk[0]) {
            let tempQuantity = quantity;

            for (const value of this.asks) {
                if (tempQuantity >= value[1]) {
                    tempQuantity -= value[1];
                    this.asks = this.asks.filter(num => num[0] !== value[0]);
                    this.currentPrice = value[0];
                } else if (tempQuantity < value[1] && price >= value[0]) {
                    value[1] -= tempQuantity;
                    this.currentPrice = value[0];
                    tempQuantity = 0;
                    break;
                }
            }

            if (tempQuantity > 0) {
                this.bids.push([price, tempQuantity]);
                this.bids.sort(Orderbook.bidComparator);
            }

        } else if (price < bestAsk[0]) {
            let flag = false;

            if (price > bestBid[0]) {
                this.bids.push([price, quantity]);
                this.bids.sort(Orderbook.bidComparator);
            } else if (price <= bestBid[0]) {
                for (const value of this.bids) {
                    if (price == value[0]) {
                        flag = true;
                        value[1] += quantity;
                        break;
                    }
                }

                if (!flag) {
                    this.bids.push([price, quantity]);
                    this.bids.sort(Orderbook.bidComparator);
                }
            }
        }

        if (this.currentPrice === 0) {
            this.currentPrice = bestAsk ? bestAsk[0] : this.currentPrice;
        }
    }

    public sell(price: type_Price, quantity: type_Quantity): void {
        if (!this.asks.length) { this.asks.push([price, quantity]); return; };
        const bestAsk: type_Price[] = this.asks[0];
        const bestBid: type_Price[] = this.bids[0];

        if (price <= bestBid[0]) {
            let tempQuantity = quantity;

            for (const value of this.bids) {
                if (tempQuantity >= value[1]) {
                    tempQuantity -= value[1];
                    this.bids = this.bids.filter(num => num[0] !== value[0]);
                    this.currentPrice = value[0];
                } else if (tempQuantity < value[1] && price <= value[0]) {
                    value[1] -= tempQuantity;
                    this.currentPrice = value[0];
                    tempQuantity = 0;
                    break;
                }
            }

            if (tempQuantity > 0) {
                this.asks.push([price, tempQuantity]);
                this.asks.sort(Orderbook.askComparator);
            }

        } else if (price > bestBid[0]) {
            let flag = false;

            if (price < bestAsk[0]) {
                this.asks.push([price, quantity]);
                this.asks.sort(Orderbook.askComparator);
            } else if (price >= bestAsk[0]) {
                for (const value of this.asks) {
                    if (price == value[0]) {
                        flag = true;
                        value[1] += quantity;
                        this.currentPrice = value[0];
                        break;
                    }
                }

                if (!flag) {
                    this.asks.push([price, quantity]);
                    this.asks.sort(Orderbook.askComparator);
                }
            }
        }

        if (this.currentPrice === 0) {
            this.currentPrice = bestBid ? bestBid[0] : this.currentPrice;
        }
    }
}

const bids = [[144.24, 0.80], [144.26, 116.81], [144.25, 69.87], [144.23, 138.67], [144.22, 34.65], [144.21, 0.03], [144.20, 138.68], [144.19, 34.73], [144.18, 138.71]];
const asks = [[144.35, 0.21], [144.37, 138.73], [144.38, 148.96], [144.34, 34.08], [144.33, 34.67], [144.31, 138.66], [144.30, 34.65], [144.29, 17.32], [144.28, 85.55]];

export const sol_usdc_ob: type_Orderbook = new Orderbook(bids, asks, 'SOL/USDC');
export const eth_usdc_ob: type_Orderbook = new Orderbook([], [], "ETH/USDC");
