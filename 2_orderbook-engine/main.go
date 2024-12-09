package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"

	// "container/heap"
	"context"
	"engine/orderbook"
	"engine/orderbookmanager"
	"time"

	"github.com/go-redis/redis/v8"
)

var rdb *redis.Client
var ctx = context.Background()
var obmInstance *obm.OrderbookManager

func init() {
	obmInstance = obm.NewOrderbookManager();
	rdb = redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("could not connect to Redis: %v", err)
	}
	fmt.Println("Connected to Redis")
}

func push(queue string, value string) {
	err := rdb.LPush(ctx, queue, value).Err()
	if err != nil {
		log.Fatalf("nahi hua bhai push : %v", err)
	}
	fmt.Println("pushed successfully")
}

func pop(queue string) []string {
	result, err := rdb.BRPop(ctx, 0*time.Second, queue).Result()
	if err != nil {
		log.Fatalf("nahi hua pop : %v", err)
	}
	// fmt.Println(result);
	return result
}

func executeTrade(tempOB *orderbook.Orderbook,parsedData *orderbook.Order) *orderbook.Order {

}

func main() {

	fmt.Println("engine started")
	for {
		order := pop("orders_from_api")

		var parsedData orderbook.Order
		err := json.Unmarshal([]byte(order[1]), &parsedData)
		if err != nil {log.Fatal("nahi hua parse, check unmarshal")}

		fmt.Println(parsedData)
		tempOB,error:= obmInstance.GetOrderbook(parsedData.Market);
		if(error != nil){log.Fatal(error);}

		if(tempOB != nil){
			data := executeTrade(tempOB,&parsedData);
			type Dbqueue struct {
				kind string
				market string
				price float64
				quantity float64
				currentPrice float64
				asks []float64
				bids []float64 
			}
			updatedData := Dbqueue{
				kind : data.Kind,
				market : data.Market,
				price : data.Price,
				quantity: float64(data.Quantity)
			}
			

			data,err := json.Marshal(updatedData);
			push("database_engine",string(jsonData));
		}
		

	}

	//boilerplate orderbook code

	// ob := orderbook.Orderbook{
	// 	Market:       "SOL/USDC",
	// 	Asks:         &orderbook.MinHeap{},
	// 	Bids:         &orderbook.MaxHeap{},
	// 	CurrentPrice: 0,
	// }

	// heap.Push(ob.Bids, &orderbook.OrderEntry{Price: 100.5, Quantity: 10})
	// heap.Push(ob.Bids, &orderbook.OrderEntry{Price: 101.0, Quantity: 5})
	// heap.Push(ob.Bids, &orderbook.OrderEntry{Price: 99.0, Quantity: 20})

	// heap.Push(ob.Asks, &orderbook.OrderEntry{Price: 98.5, Quantity: 15})
	// heap.Push(ob.Asks, &orderbook.OrderEntry{Price: 97.0, Quantity: 8})

	// // fmt.Println(value1, value2)
	// fmt.Println("Bids:")
	// for _, bid := range *ob.Bids {
	// 	fmt.Printf("Price: %.2f, Amount: %.2f\n", bid.Price, bid.Quantity)
	// }

	// fmt.Println("Asks:")
	// for _, ask := range *ob.Asks {
	// 	fmt.Printf("Price: %.2f, Amount: %.2f\n", ask.Price, ask.Quantity)
	// }

}
