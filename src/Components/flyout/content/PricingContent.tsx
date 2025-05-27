import type React from "react"
import Link from "next/link"
import styles from "./PricingContent.module.css"

interface MenuItem {
    href: string
    label: string
}

interface MenuSection {
    title: string
    items: MenuItem[]
}

const MENU_SECTIONS: MenuSection[] = [
    {
        title: "Making your Keyboard",
        items: [
            {href: "/products/split-keyboards", label: "Split Keyboards"},
            {href: "/products/keyboards", label: "Keyboards"},
        ],
    },
    {
        title: "Components",
        items: [
            {href: "/products/keycaps", label: "Keycaps"},
            {href: "/products/switches", label: "Switches"},
            {href: "/products/layouts", label: "Layouts"},
        ],
    },
]

const PricingContent: React.FC = () => {
    return (
        <div className={styles.container}>
            {MENU_SECTIONS.map((section, index) => (
                <div key={section.title} className={styles.section}>
                    <h3 className={styles.heading}>{section.title}</h3>
                    {section.items.map((item) => (
                        <Link key={item.href} href={item.href} className={styles.link}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            ))}

            <div className={styles.customSection}>
                <h3 className={styles.heading}>If you want a custom Keyboard</h3>
                <button className={styles.button}>Contact Us</button>
            </div>
        </div>
    )
}

export default PricingContent
