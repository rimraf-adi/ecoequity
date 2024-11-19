package main

import (
	"fmt"
	"engine/orderbook"
	"container/heap"
)


func main(){
	// bids := &MaxHeap{}
	// asks := &MinHeap{}
	// heap.Init(bids)
	// heap.Init(asks)

	fmt.Println("engine started")
	ob := orderbook.Orderbook{
		Market : "SOL/USDC",
		Asks : &orderbook.MinHeap{},
		Bids : &orderbook.MaxHeap{},
		CurrentPrice : 0,
	}


	heap.Push(ob.Bids, &orderbook.OrderEntry{Price: 100.5, Quantity: 10})
	heap.Push(ob.Bids, &orderbook.OrderEntry{Price: 101.0, Quantity: 5})
	heap.Push(ob.Bids, &orderbook.OrderEntry{Price: 99.0, Quantity: 20})

	heap.Push(ob.Asks, &orderbook.OrderEntry{Price: 98.5, Quantity: 15})
	heap.Push(ob.Asks, &orderbook.OrderEntry{Price: 97.0, Quantity: 8})

	
}