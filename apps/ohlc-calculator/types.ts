export interface type_bucket {
    price: number,
    timestamp: number
}

export interface type_ParsedData {
    price : number
    timestamp : number
    market : string
}

export interface type_OHLC {
    open : number,
    high : number,
    low : number,
    close : number,
    timestamp : number
}