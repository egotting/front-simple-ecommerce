import type React from "react"
import Link from "next/link"
import Image from "next/image"
import type { CartItem } from "@/types/CartItem"
import { formatPrice, calculateSubtotal, getTotalItems } from "@/utils/cart"
import styles from "./CartContent.module.css"

interface CartContentProps {
    items: CartItem[]
}

const CartContent: React.FC<CartContentProps> = ({ items }) => {
    const subtotal = calculateSubtotal(items)
    const totalItems = getTotalItems(items)
    const isEmpty = items.length === 0

    if (isEmpty) {
        return (
            <div className={styles.container}>
                <h3 className={styles.title}>Shopping Cart</h3>
                <div className={styles.emptyState}>
                    <p className={styles.emptyText}>Your cart is empty</p>
                    <Link href="/products" className={styles.shopButton}>
                        Start Shopping
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>Shopping Cart</h3>
                <span className={styles.itemCount}>{totalItems} items</span>
            </div>

            <div className={styles.products}>
                {items.map((item, index) => (
                    <CartItemRow key={item.products.id} item={item} isBlurred={index > 0} />
                ))}
            </div>

            <div className={styles.footer}>
                <div className={styles.subtotal}>
                    <span>Subtotal: {formatPrice(subtotal)}</span>
                </div>
                <Link href="/cart" className={styles.viewCartButton}>
                    View Cart
                </Link>
            </div>
        </div>
    )
}

interface CartItemRowProps {
    item: CartItem
    isBlurred: boolean
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item, isBlurred }) => {
    return (
        <div className={`${styles.item} ${isBlurred ? styles.itemBlurred : ""}`}>
            <Image
                src={item.products.image || "/placeholder.svg"}
                alt={item.products.name}
                width={60}
                height={60}
                className={styles.image}
            />
            <div className={styles.details}>
                <h4 className={styles.name}>{item.products.name}</h4>
                <p className={styles.price}>{formatPrice(item.products.price)}</p>
                <p className={styles.quantity}>Qty: {item.quantity}</p>
            </div>
        </div>
    )
}

export default CartContent
