"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getCurrentUser, type User } from "@/utils/auth"
import styles from "./success.module.css"

export default function SignUpSuccessPage() {
    const [user, setUser] = useState<User | null>(null)
    const [discountCode] = useState("WELCOME15")
    const [countdown, setCountdown] = useState(10)
    const [showCode, setShowCode] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Get current user
        const currentUser = getCurrentUser()
        setUser(currentUser)

        // Show discount code after a brief delay
        const codeTimer = setTimeout(() => {
            setShowCode(true)
        }, 1000)

        // Start countdown after showing the code
        const countdownTimer = setTimeout(() => {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)

            return () => clearInterval(timer)
        }, 2000)

        return () => {
            clearTimeout(codeTimer)
            clearTimeout(countdownTimer)
        }
    }, [])

    const copyDiscountCode = () => {
        navigator.clipboard.writeText(discountCode)
        alert("Discount code copied to clipboard!")
    }

    const handleStartShopping = () => {
        router.push("/products")
    }

    const handleCompleteProfile = () => {
        router.push("/profile/settings")
    }

    const handleGoHome = () => {
        router.push("/")
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                {/* Success Animation */}
                <div className={styles.iconContainer}>
                    <div className={styles.successIcon}>
                        <span className={styles.checkmark}>✓</span>
                    </div>
                </div>

                {/* Confetti Animation */}
                <div className={styles.confetti}>
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className={styles.confettiPiece} style={{ left: `${i * 6.67}%` }}></div>
                    ))}
                </div>

                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome to the family!</h1>
                    <p className={styles.subtitle}>
                        {user
                            ? `Hi ${user.name.split(" ")[0]}, your account has been created successfully.`
                            : "Your account has been created successfully."}
                    </p>
                </div>

                {/* Discount Code Section */}
                {showCode && (
                    <div className={styles.discountSection}>
                        <div className={styles.discountCard}>
                            <div className={styles.discountHeader}>
                                <span className={styles.discountIcon}>🎁</span>
                                <h3 className={styles.discountTitle}>Your Welcome Gift</h3>
                            </div>
                            <div className={styles.discountContent}>
                                <p className={styles.discountText}>15% off your first order + free shipping</p>
                                <div className={styles.codeContainer}>
                                    <code className={styles.discountCode}>{discountCode}</code>
                                    <button onClick={copyDiscountCode} className={styles.copyButton}>
                                        Copy
                                    </button>
                                </div>
                                <p className={styles.codeExpiry}>Valid for 30 days • Minimum order $50</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* User Info */}
                <div className={styles.userInfo}>
                    {user && (
                        <div className={styles.userCard}>
                            <div className={styles.userAvatar}>
                                <img
                                    src={user.avatar || "/placeholder.svg?height=48&width=48"}
                                    alt={user.name}
                                    className={styles.avatarImage}
                                />
                            </div>
                            <div className={styles.userDetails}>
                                <p className={styles.userName}>{user.name}</p>
                                <p className={styles.userEmail}>{user.email}</p>
                                <div className={styles.memberBadge}>
                                    <span className={styles.badgeIcon}>⭐</span>
                                    <span className={styles.badgeText}>New Member</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Benefits Section */}
                <div className={styles.benefitsSection}>
                    <h3 className={styles.benefitsTitle}>Your Member Benefits</h3>
                    <div className={styles.benefitsList}>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>🚚</span>
                            <div className={styles.benefitContent}>
                                <h4 className={styles.benefitTitle}>Free Shipping</h4>
                                <p className={styles.benefitText}>On orders over $50</p>
                            </div>
                        </div>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>🎯</span>
                            <div className={styles.benefitContent}>
                                <h4 className={styles.benefitTitle}>Exclusive Deals</h4>
                                <p className={styles.benefitText}>Member-only discounts</p>
                            </div>
                        </div>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>🏆</span>
                            <div className={styles.benefitContent}>
                                <h4 className={styles.benefitTitle}>Loyalty Points</h4>
                                <p className={styles.benefitText}>Earn points on every purchase</p>
                            </div>
                        </div>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>🔄</span>
                            <div className={styles.benefitContent}>
                                <h4 className={styles.benefitTitle}>Easy Returns</h4>
                                <p className={styles.benefitText}>30-day return policy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className={styles.nextSteps}>
                    <h3 className={styles.nextStepsTitle}>Get Started</h3>
                    <div className={styles.stepsList}>
                        <div className={styles.step}>
                            <span className={styles.stepNumber}>1</span>
                            <div className={styles.stepContent}>
                                <h4 className={styles.stepTitle}>Browse Products</h4>
                                <p className={styles.stepText}>Discover our latest collection</p>
                            </div>
                        </div>
                        <div className={styles.step}>
                            <span className={styles.stepNumber}>2</span>
                            <div className={styles.stepContent}>
                                <h4 className={styles.stepTitle}>Add to Cart</h4>
                                <p className={styles.stepText}>Use your discount code at checkout</p>
                            </div>
                        </div>
                        <div className={styles.step}>
                            <span className={styles.stepNumber}>3</span>
                            <div className={styles.stepContent}>
                                <h4 className={styles.stepTitle}>Enjoy Free Shipping</h4>
                                <p className={styles.stepText}>Fast delivery to your door</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.actions}>
                    <button onClick={handleStartShopping} className={styles.primaryButton}>
                        <span className={styles.buttonIcon}>🛍️</span>
                        Start Shopping Now
                    </button>

                    <div className={styles.secondaryActions}>
                        <button onClick={handleCompleteProfile} className={styles.secondaryButton}>
                            Complete Profile
                        </button>
                        <button onClick={handleGoHome} className={styles.secondaryButton}>
                            Go to Home
                        </button>
                    </div>
                </div>

                {/* Popular Categories */}
                <div className={styles.categoriesSection}>
                    <h3 className={styles.categoriesTitle}>Popular Categories</h3>
                    <div className={styles.categoriesGrid}>
                        <Link href="/products/keyboards" className={styles.categoryCard}>
                            <span className={styles.categoryIcon}>⌨️</span>
                            <span className={styles.categoryName}>Keyboards</span>
                        </Link>
                        <Link href="/products/mice" className={styles.categoryCard}>
                            <span className={styles.categoryIcon}>🖱️</span>
                            <span className={styles.categoryName}>Gaming Mice</span>
                        </Link>
                        <Link href="/products/headsets" className={styles.categoryCard}>
                            <span className={styles.categoryIcon}>🎧</span>
                            <span className={styles.categoryName}>Headsets</span>
                        </Link>
                        <Link href="/products/monitors" className={styles.categoryCard}>
                            <span className={styles.categoryIcon}>🖥️</span>
                            <span className={styles.categoryName}>Monitors</span>
                        </Link>
                    </div>
                </div>

                {/* Auto-redirect notice */}
                {countdown > 0 && (
                    <div className={styles.redirectNotice}>
                        <p className={styles.redirectText}>
                            Redirecting to products in <span className={styles.countdown}>{countdown}</span> seconds
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
