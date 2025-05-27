"use client"

import {useState, useEffect} from "react"
import styles from "./header.module.css"
import Image from "next/image"
import profile from "../../../public/account.png"
import {FlyoutLink, PricingContent, ContactContent, CartContent} from "@/Components/flyout"
import type {CartItem} from "@/types/CartItem"

// Mock cart data - you should replace this with your actual cart state
const mockCartItems: CartItem[] = [
    {
        products: {
            id: 1,
            name: "Mechanical Keyboard",
            price: 149.99,
            image: "/placeholder.svg?height=60&width=60",
        },
        quantity: 1,
    },
    {
        products: {
            id: 2,
            name: "Custom Keycaps",
            price: 79.99,
            image: "/placeholder.svg?height=60&width=60",
        },
        quantity: 2,
    },
    {
        products: {
            id: 3,
            name: "Gaming Mouse",
            price: 89.99,
            image: "/placeholder.svg?height=60&width=60",
        },
        quantity: 1,
    },
]

// Mock user data - replace with your actual user type
interface User {
    id: number
    name: string
    email: string
    avatar?: string
}

// Mock authentication hook - replace with your actual auth implementation
const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
                const userData = localStorage.getItem("userData")

                if (isLoggedIn && userData) {
                    setUser(JSON.parse(userData))
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.error("Auth check failed:", error)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = async (UserData: User) => {
        setUser(UserData)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userData", JSON.stringify({
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            avatar: '../../../public/account.png'
        }))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("userData")
    }

    return {user, isLoading, login, logout}
}

export function Header() {
    const {user, isLoading, logout} = useAuth()

    const handleSignOut = () => {
        logout()
        window.location.href = "/"
    }

    return (
        <header className={styles.header}>
            <div className={styles.divMain}>
                <nav className={styles.nav}>
                    <div className={styles.logoContainer}>
                        <h1 className={styles.logo}>Ecommerce</h1>
                    </div>

                    <div className={styles.navLinks}>
                        <a href="#home" className={styles.navLink}>
                            Home
                        </a>

                        <a href="#about" className={styles.navLink}>
                            About
                        </a>

                        <FlyoutLink href="/contact" FlyoutContent={ContactContent}>
                            Contact Us
                        </FlyoutLink>

                        <FlyoutLink href="/products" FlyoutContent={PricingContent}>
                            Products
                        </FlyoutLink>
                    </div>

                    <div className={styles.user}>
                        <FlyoutLink
                            href="/cart"
                            FlyoutContent={() => <CartContent items={mockCartItems}/>}
                            className={styles.cartLink}
                        >
                            <span className={styles.cartIcon}>🛒</span>
                            <span className={styles.cartText}>Cart</span>
                            <span
                                className={styles.cartCount}>{mockCartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                        </FlyoutLink>

                        {user && (
                            <div className={styles.profileContainer}>
                                <a href="/profile" className={styles.profileLink}>
                                    <Image
                                        src={user.avatar || profile || "../../../public/account.png"}
                                        alt={`${user.name}'s Profile`}
                                        width={32}
                                        height={32}
                                        className={styles.iconProfile}
                                    />
                                </a>
                                <button onClick={handleSignOut} className={styles.signOutButton}>
                                    Sign Out
                                </button>
                            </div>
                        )}

                        {!user && !isLoading && (
                            <div className={styles.authLinks}>
                                <a href="/sign-up" className={styles.signUp}>
                                    Sign Up
                                </a>
                                <a href="/sign-in" className={styles.signIn}>
                                    <b>Sign In</b>
                                </a>
                            </div>
                        )}

                        {isLoading && (
                            <div className={styles.authLoading}>
                                <div className={styles.loadingSpinner}></div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}
