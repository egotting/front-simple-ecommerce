export interface Product {
    id: number
    name: string
    price: number
    image: string
}

export interface CartItem {
    products: Product
    quantity: number
}