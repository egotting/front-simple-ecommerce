export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    role?: string
}

export const mockLogin = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Demo credentials
            if (email === "user@example.com" && password === "password") {
                const user: User = {
                    id: "1",
                    name: "John Doe",
                    email: "user@example.com",
                    avatar: "/account.png",
                    role: "user",
                }
                resolve(user)
            } else if (email === "admin@example.com" && password === "admin123") {
                const user: User = {
                    id: "2",
                    name: "Admin User",
                    email: "admin@example.com",
                    avatar: "/placeholder.svg?height=32&width=32",
                    role: "admin",
                }
                resolve(user)
            } else {
                reject(new Error("Invalid email or password"))
            }
        }, 1500) // Simulate network delay
    })
}

export const mockRegister = (userData: {
    name: string
    email: string
    password: string
}): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Check if email already exists (mock check)
            if (userData.email === "existing@example.com") {
                reject(new Error("Email already exists"))
                return
            }

            const user: User = {
                id: Date.now().toString(),
                name: userData.name,
                email: userData.email,
                avatar: "/placeholder.svg?height=32&width=32",
                role: "user",
            }
            resolve(user)
        }, 1500)
    })
}

export const getCurrentUser = (): User | null => {
    if (typeof window === "undefined") return null

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const userData = localStorage.getItem("userData")

    if (isLoggedIn && userData) {
        try {
            return JSON.parse(userData)
        } catch {
            return null
        }
    }

    return null
}

export const setAuthData = (user: User) => {
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userData", JSON.stringify(user))
}

export const clearAuthData = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userData")
}

export const isAuthenticated = (): boolean => {
    return getCurrentUser() !== null
}

// Password validation
export const validatePassword = (password: string): string[] => {
    const errors: string[] = []

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long")
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter")
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter")
    }
    if (!/\d/.test(password)) {
        errors.push("Password must contain at least one number")
    }

    return errors
}

// Email validation
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
