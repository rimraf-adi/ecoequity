package orderbookManager

import (
	"fmt"
	"2_orderbook-engine/orderbook"
)

type OrderbookManager struct {
	orderbooks map[string]*Orderbook
}


func (obm *OrderbookManager) Push(market Market, ob *Orderbook) {
	obm.orderbooks[market] = ob
}

func (obm *OrderbookManager) HandleMissingOrderbooks(market string) *Orderbook{
	tempOB := Orderbook(nil,nil,market);
}