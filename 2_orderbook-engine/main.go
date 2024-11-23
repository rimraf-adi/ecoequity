package main

import (
	"container/heap"
	"engine/orderbook"
	"fmt"
)

func main() {

	fmt.Println("engine started")

	//boilerplate orderbook code

	ob := orderbook.Orderbook{
		Market:       "SOL/USDC",
		Asks:         &orderbook.MinHeap{},
		Bids:         &orderbook.MaxHeap{},
		CurrentPrice: 0,
	}

	heap.Push(ob.Bids, &orderbook.OrderEntry{Price: 100.5, Quantity: 10})
	heap.Push(ob.Bids, &orderbook.OrderEntry{Price: 101.0, Quantity: 5})
	heap.Push(ob.Bids, &orderbook.OrderEntry{Price: 99.0, Quantity: 20})

	heap.Push(ob.Asks, &orderbook.OrderEntry{Price: 98.5, Quantity: 15})
	heap.Push(ob.Asks, &orderbook.OrderEntry{Price: 97.0, Quantity: 8})



	// fmt.Println(value1, value2)
	fmt.Println("Bids:")
	for _, bid := range *ob.Bids {
		fmt.Printf("Price: %.2f, Amount: %.2f\n", bid.Price, bid.Quantity)
	}

	fmt.Println("Asks:")
	for _, ask := range *ob.Asks {
		fmt.Printf("Price: %.2f, Amount: %.2f\n", ask.Price, ask.Quantity)
	}

}
