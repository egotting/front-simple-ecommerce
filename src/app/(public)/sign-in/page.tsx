"use client"

import type React from "react"

import {useState} from "react"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {mockLogin} from "@/utils/auth"
import styles from "./sign-in.module.css"

export default function SignInPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isLoading, setIsLoading] = useState(false)
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
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
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
            const user = await mockLogin(formData.email, formData.password)

            // Store user data
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("userData", JSON.stringify(user))

            // Redirect to home page or dashboard
            router.push("/")

            // Trigger a custom event to update the header
            window.dispatchEvent(new Event("authStateChanged"))
        } catch (error) {
            setErrors({
                general: error instanceof Error ? error.message : "Login failed. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleDemoLogin = () => {
        setFormData({
            email: "user@example.com",
            password: "password",
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {errors.general && <div className={styles.errorAlert}>{errors.general}</div>}

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />
                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                    </div>

                    <div className={styles.formOptions}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox}/>
                            <span className={styles.checkboxText}>Remember me</span>
                        </label>
                        <Link href="/forgot-password" className={styles.forgotLink}>
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${styles.submitButton} ${isLoading ? styles.loading : ""}`}
                    >
                        {isLoading ? (
                            <>
                                <span className={styles.spinner}></span>
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                    <button type="button" onClick={handleDemoLogin} className={styles.demoButton} disabled={isLoading}>
                        Use Demo Credentials
                    </button>
                </form>

                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        Don't have an account?{" "}
                        <Link href="/sign-up" className={styles.signUpLink}>
                            Sign up
                        </Link>
                    </p>
                </div>

                <div className={styles.divider}>
                    <span className={styles.dividerText}>Or continue with</span>
                </div>

                <div className={styles.socialButtons}>
                    <button className={styles.socialButton}>
                        <span className={styles.socialIcon}>🔍</span>
                        Google
                    </button>
                    <button className={styles.socialButton}>
                        <span className={styles.socialIcon}>📘</span>
                        Facebook
                    </button>
                    <button className={styles.socialButton}>
                        <span className={styles.socialIcon}>🐙</span>
                        GitHub
                    </button>
                </div>
            </div>
        </div>
    )
}
