import type { CartItem } from "@/types/CartItem"

export const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`
}

export const calculateSubtotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.products.price * item.quantity, 0)
}

export const getTotalItems = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
}
