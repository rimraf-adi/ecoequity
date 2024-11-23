package obm

import (
	// "fmt"
	"engine/orderbook"
	"errors"
)

type OrderbookManager struct {
	orderbooks map[string]*orderbook.Orderbook
}
func NewOrderbookManager() *OrderbookManager {
    return &OrderbookManager{
        orderbooks: make(map[string]*orderbook.Orderbook),  // Initialize the map
    }
}
func (obm *OrderbookManager) Push(market string, ob *orderbook.Orderbook) {
	obm.orderbooks[market] = ob
}
func (obm *OrderbookManager) GetOrderbook(market string) (*orderbook.Orderbook,error) {
	value,exists := obm.orderbooks[market];
	if(!exists){return nil, errors.New("nahi hai bhai yeh wala market")}
	return value,nil;

}

func (obm *OrderbookManager) HandleMissingOrderbooks(market string) *orderbook.Orderbook {
	tempOB := orderbook.Orderbook{
		Market:       market,
		Asks:         nil,
		Bids:         nil,
		CurrentPrice: 0,
	}
	return &tempOB
}
