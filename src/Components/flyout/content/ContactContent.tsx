import type React from "react"
import Link from "next/link"
import styles from "./ContactContent.module.css"

interface ContactOption {
    href: string
    label: string
    icon?: string
}

const CONTACT_OPTIONS: ContactOption[] = [
    { href: "#send-email", label: "Send your question for us", icon: "✉️" },
    { href: "#phone-number", label: "Phone number", icon: "📞" },
]

const ContactContent: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h3 className={styles.heading}>Contact Us!</h3>
                {CONTACT_OPTIONS.map((option) => (
                    <Link key={option.href} href={option.href} className={styles.link}>
                        {option.icon && <span className={styles.icon}>{option.icon}</span>}
                        {option.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ContactContent
