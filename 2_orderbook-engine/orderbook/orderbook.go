package orderbook

import (
	"container/heap"
	// "debug/elf"
)

// some basic initialisations for orderbook
type Order struct {
	Kind     string
	Market   string
	Price    float64
	Quantity int
}

type OrderEntry struct {
	Price    float64
	Quantity float64
}

type MaxHeap []*OrderEntry

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i].Price > h[j].Price }

func (h MaxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(*OrderEntry)) }
func (h *MaxHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

type MinHeap []*OrderEntry

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i].Price < h[j].Price }

func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(*OrderEntry)) }
func (h *MinHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// orderbook
type Orderbook struct {
	Market       string
	Asks         *MinHeap
	Bids         *MaxHeap
	CurrentPrice float64
}

func (ob *Orderbook) Buy(price float64, quantity float64) {
	if ob.Bids.Len() == 0 {heap.Push(ob.Bids, &OrderEntry{Price : price, Quantity: quantity})}

	bestAsk := (*ob.Asks)[0]
	bestBid := (*ob.Bids)[0]

	if price >= bestAsk.Price {
		tempquantity := quantity
	
		for _,value := range *ob.Asks {
			if(tempquantity >= value.Quantity){
				tempquantity -= value.Quantity
				// heap.Pop(ob.Asks);
				ob.Asks.Pop()
			}
			if (tempquantity < value.Quantity && price >=value.Price){
				value.Quantity -= tempquantity;
				ob.CurrentPrice = value.Price;
				tempquantity = 0;
				break;
			}

		}

		if (tempquantity > 0 ) {
			// order := OrderEntry{Price: price, Quantity: quantity}
			// ob.Bids.Push(order);
			ob.Bids.Push([]interface{}{price, quantity})

		}
	}
	if (price < bestAsk.Price){
		flag := false;
		if(price > bestBid.Price){ ob.Bids.Push([]interface{}{price, quantity});}
		if(price <= bestBid.Price){
			for _,value := range *ob.Bids {
				if(price == value.Price){
					flag = true;
					value.Quantity += quantity;
					break;

				}
			}
			if(!flag){ob.Bids.Push([]interface{}{price,quantity});}

			if ob.CurrentPrice == 0 {
				if bestAsk != nil  {
					ob.CurrentPrice = bestAsk.Price;
				}
			}
			
		}


		
	}


}
func (ob *Orderbook) Sell(price float64, quantity float64) {
	if ob.Asks.Len() == 0 {heap.Push(ob.Asks, &OrderEntry{Price: price, Quantity: quantity})}

	bestAsk := (*ob.Asks)[0]
	bestBid := (*ob.Bids)[0]

	if price <= bestBid.Price {
		tempquantity := quantity

		for _, value := range *ob.Bids {
			if tempquantity >= value.Quantity {
				tempquantity -= value.Quantity
				ob.Bids.Pop()
			}
			if tempquantity < value.Quantity && price <= value.Price {
				value.Quantity -= tempquantity
				ob.CurrentPrice = value.Price
				tempquantity = 0
				break
			}
		}

		if tempquantity > 0 {
			ob.Asks.Push([]interface{}{price, quantity})
		}
	}
	if price > bestBid.Price {
		flag := false
		if price < bestAsk.Price {
			ob.Asks.Push([]interface{}{price, quantity})
		}
		if price >= bestAsk.Price {
			for _, value := range *ob.Asks {
				if price == value.Price {
					flag = true
					value.Quantity += quantity
					break
				}
			}
			if !flag {
				ob.Asks.Push([]interface{}{price, quantity})
			}

			if ob.CurrentPrice == 0 {
				if bestBid != nil {
					ob.CurrentPrice = bestBid.Price
				}
			}
		}
	}
}


func (ob *Orderbook) GetDepth() ([]*OrderEntry, []*OrderEntry){
	bids := make([]*OrderEntry, len(*ob.Bids))
	copy(bids, *ob.Bids)

	asks := make([]*OrderEntry, len(*ob.Asks))
	copy(asks, *ob.Asks)

	return  bids, asks
}
