package orderbook

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

}

func (ob *Orderbook) Sell(price float64, quantity float64) {

}

func (ob *Orderbook) GetDepth() ([]*OrderEntry, []*OrderEntry){
	bids := make([]*OrderEntry, len(*ob.Bids))
	copy(bids, *ob.Bids)

	asks := make([]*OrderEntry, len(*ob.Asks))
	copy(asks, *ob.Asks)

	return  bids, asks
}
