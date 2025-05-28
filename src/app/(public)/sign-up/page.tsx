"use client"

import type React from "react"

import {useState} from "react"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {mockRegister} from "@/utils/auth"
import styles from "./sign-up.module.css"
import Head from "next/head";


export default function SignUpPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        birthDate: "",
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isLoading, setIsLoading] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [marketingAccepted, setMarketingAccepted] = useState(true)
    const [smsAccepted, setSmsAccepted] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [selectedInterests] = useState<string[]>([])
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }

        // Check password strength when password field changes
        if (name === "password") {
            checkPasswordStrength(value)
        }

        // Check if passwords match when confirmPassword field changes
        if (name === "confirmPassword" && formData.password !== value) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match",
            }))
        } else if (name === "confirmPassword") {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "",
            }))
        }
    }

    const checkPasswordStrength = (password: string) => {
        let strength = 0

        if (password.length >= 8) strength += 1
        if (/[a-z]/.test(password)) strength += 1
        if (/[A-Z]/.test(password)) strength += 1
        if (/[0-9]/.test(password)) strength += 1
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1

        setPasswordStrength(strength)
    }

    const getStrengthText = () => {
        if (passwordStrength === 0) return "Very Weak"
        if (passwordStrength === 1) return "Weak"
        if (passwordStrength === 2) return "Fair"
        if (passwordStrength === 3) return "Good"
        if (passwordStrength === 4) return "Strong"
        return "Very Strong"
    }

    const getStrengthColor = () => {
        if (passwordStrength <= 1) return styles.strengthWeak
        if (passwordStrength === 2) return styles.strengthFair
        if (passwordStrength === 3) return styles.strengthGood
        return styles.strengthStrong
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required"
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = "First name must be at least 2 characters"
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters"
        }

        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        } else if (passwordStrength < 3) {
            newErrors.password = "Password is too weak"
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        // Phone validation (optional but if provided, must be valid)
        if (formData.phone && !/^\+?[\d\s\-$$$$]{10,}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number"
        }

        // Terms acceptance validation
        if (!termsAccepted) {
            newErrors.terms = "You must accept the Terms and Privacy Policy"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const user = await mockRegister({
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
            })

            // Store user data with additional ecommerce info
            const userData = {
                ...user,
                phone: formData.phone,
                birthDate: formData.birthDate,
                interests: selectedInterests,
                marketingConsent: marketingAccepted,
                smsConsent: smsAccepted,
                signUpDate: new Date().toISOString(),
            }

            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("userData", JSON.stringify(userData))

            // Trigger a custom event to update the header
            window.dispatchEvent(new Event("authStateChanged"))

            // Redirect to success page with welcome offer
            router.push("/sign-up/success")
        } catch (error) {
            setErrors({
                general: error instanceof Error ? error.message : "Registration failed. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSocialSignUp = (provider: string) => {
        alert(`Sign up with ${provider} would be implemented here`)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <Head>
                <title>Coding Beauty</title>
            </Head>
            <main className={styles.container}>

                <div className={styles.formWrapper}>
                    <div className={styles.offerBanner}>
                        <div className={styles.offerIcon}>🎉</div>
                        <div className={styles.offerContent}>
                            <h3 className={styles.offerTitle}>Welcome Offer!</h3>
                            <p className={styles.offerText}>Get 15% off your first order + free shipping</p>
                        </div>
                    </div>

                    <div className={styles.header}>
                        <h1 className={styles.title}>Join Our Community</h1>
                        <p className={styles.subtitle}>Create your account and start shopping with exclusive
                            benefits</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {errors.general && <div className={styles.errorAlert}>{errors.general}</div>}

                        <div className={styles.nameRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="firstName" className={styles.label}>
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                                    placeholder="John"
                                    disabled={isLoading}
                                />
                                {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="lastName" className={styles.label}>
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
                                    placeholder="Doe"
                                    disabled={isLoading}
                                />
                                {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                                placeholder="john.doe@example.com"
                                disabled={isLoading}
                            />
                            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Password *
                            </label>
                            <div className={styles.passwordInputWrapper}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                                    placeholder="Create a strong password"
                                    disabled={isLoading}
                                />
                                <button type="button" onClick={togglePasswordVisibility}
                                        className={styles.passwordToggle}
                                        tabIndex={-1}>
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {formData.password && (
                                <div className={styles.passwordStrength}>
                                    <div className={styles.strengthBar}>
                                        <div
                                            className={`${styles.strengthFill} ${getStrengthColor()}`}
                                            style={{width: `${(passwordStrength / 5) * 100}%`}}
                                        ></div>
                                    </div>
                                    <span className={styles.strengthText}>{getStrengthText()}</span>
                                </div>
                            )}
                            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="confirmPassword" className={styles.label}>
                                Confirm Password *
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                                placeholder="Confirm your password"
                                disabled={isLoading}
                            />
                            {errors.confirmPassword &&
                                <span className={styles.errorText}>{errors.confirmPassword}</span>}
                        </div>

                        <div className={styles.optionalSection}>
                            <h3 className={styles.sectionTitle}>Optional Information</h3>
                            <p className={styles.sectionSubtitle}>Help us personalize your experience</p>

                            <div className={styles.nameRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="phone" className={styles.label}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                                        placeholder="+1 (555) 123-4567"
                                        disabled={isLoading}
                                    />
                                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                                    <span
                                        className={styles.fieldHint}>For order updates and delivery notifications</span>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="birthDate" className={styles.label}>
                                        Birthday
                                    </label>
                                    <input
                                        type="date"
                                        id="birthDate"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        className={styles.input}
                                        disabled={isLoading}
                                    />
                                    <span className={styles.fieldHint}>Get special birthday offers</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.preferencesSection}>
                            <h3 className={styles.sectionTitle}>Stay Connected</h3>

                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={marketingAccepted}
                                        onChange={() => setMarketingAccepted(!marketingAccepted)}
                                        className={styles.checkbox}
                                        disabled={isLoading}
                                    />
                                    <span className={styles.checkboxText}>
                  <strong>Email me about new products, sales, and exclusive offers</strong>
                  <br/>
                  <small>Get the latest deals and product updates delivered to your inbox</small>
                </span>
                                </label>
                            </div>
                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={smsAccepted}
                                        onChange={() => setSmsAccepted(!smsAccepted)}
                                        className={styles.checkbox}
                                        disabled={isLoading}
                                    />
                                    <span className={styles.checkboxText}>
                  <strong>Send me SMS notifications for order updates</strong>
                  <br/>
                  <small>Get real-time updates about your orders and deliveries</small>
                </span>
                                </label>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className={styles.termsGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={() => setTermsAccepted(!termsAccepted)}
                                    className={styles.checkbox}
                                    disabled={isLoading}
                                />
                                <span className={styles.checkboxText}>
                I agree to the{" "}
                                    <Link href="/terms" className={styles.termsLink}>
                  Terms of Service
                </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className={styles.termsLink}>
                  Privacy Policy
                </Link>
                *
              </span>
                            </label>
                            {errors.terms && <span className={styles.errorText}>{errors.terms}</span>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${styles.submitButton} ${isLoading ? styles.loading : ""}`}
                        >
                            {isLoading ? (
                                <>
                                    <span className={styles.spinner}></span>
                                    Creating Your Account...
                                </>
                            ) : (
                                <>
                                    <span className={styles.buttonIcon}>🛍️</span>
                                    Create Account & Get 15% Off
                                </>
                            )}
                        </button>
                    </form>

                    {/* Trust Signals */}
                    <div className={styles.trustSignals}>
                        <div className={styles.trustItem}>
                            <span className={styles.trustIcon}>🔒</span>
                            <span className={styles.trustText}>Secure & Encrypted</span>
                        </div>
                        <div className={styles.trustItem}>
                            <span className={styles.trustIcon}>📦</span>
                            <span className={styles.trustText}>Free Shipping</span>
                        </div>
                        <div className={styles.trustItem}>
                            <span className={styles.trustIcon}>↩️</span>
                            <span className={styles.trustText}>Easy Returns</span>
                        </div>
                    </div>

                    <div className={styles.divider}>
                        <span className={styles.dividerText}>Or sign up with</span>
                    </div>

                    <div className={styles.socialButtons}>
                        <button
                            type="button"
                            onClick={() => handleSocialSignUp("Google")}
                            className={styles.socialButton}
                            disabled={isLoading}
                        >
                            <span className={styles.socialIcon}>🔍</span>
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSocialSignUp("Facebook")}
                            className={styles.socialButton}
                            disabled={isLoading}
                        >
                            <span className={styles.socialIcon}>📘</span>
                            Facebook
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSocialSignUp("Apple")}
                            className={styles.socialButton}
                            disabled={isLoading}
                        >
                            <span className={styles.socialIcon}>🍎</span>
                            Apple
                        </button>
                    </div>

                    <div className={styles.footer}>
                        <p className={styles.footerText}>
                            Already have an account?{" "}
                            <Link href="/sign-in" className={styles.signInLink}>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}
