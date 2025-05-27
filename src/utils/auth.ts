// Utility functions for authentication
export interface User {
    id: string
    name: string
    email: string
    avatar?: string
}

export const mockLogin = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "user@example.com" && password === "password") {
                const user: User = {
                    id: "1",
                    name: "John Doe",
                    email: "user@example.com",
                    avatar: "../../../public/account.png",
                }
                resolve(user)
            } else {
                reject(new Error("Invalid credentials"))
            }
        }, 1000)
    })
}

export const getCurrentUser = (): User | null => {
    if (typeof window === "undefined") return null

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const userData = localStorage.getItem("userData")

    if (isLoggedIn && userData) {
        return JSON.parse(userData)
    }

    return null
}

export const setAuthData = (user: User) => {
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userData", JSON.stringify({user}))
}

export const clearAuthData = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userData")
}
