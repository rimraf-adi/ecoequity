package orderbook




type Order struct {
	Kind     string  
	Market 	string
	Price    float64 
	Quantity int     
}
type MaxHeap []*Order
func (h MaxHeap) Len() int            { return len(h) }
func (h MaxHeap) Less(i, j int) bool  { return h[i].Price > h[j].Price } 
// func (h MaxHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(*Order)) }
func (h *MaxHeap) Pop() interface{}   { old := *h; n := len(old); x := old[n-1]; *h = old[0 : n-1]; return x }


type MinHeap []*Order
func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i].Price < h[j].Price } 
// func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(*Order)) }
func (h *MinHeap) Pop() interface{}  { old := *h; n := len(old); x := old[n-1]; *h = old[0 : n-1]; return x }


type OrderBook struct {
	asks *MinHeap 
	bids *MaxHeap 
	currentPrice float64
	market string
}