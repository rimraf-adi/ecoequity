import { Orderbook } from "./orderbook";

export type type_Price = number;
export type type_Quantity = number;
export type type_BidSide = number[][];
export type type_AskSide = number[][];
export type type_Market = string;
export type type_orderbook = Orderbook 

export interface type_UserBalances {
    userID : String,
    balance : type_Price

}

export interface type_Depth { bids: type_BidSide, asks: type_AskSide, current_price : type_Price }