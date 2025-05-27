"use client"

import type React from "react"
import {useState, useEffect, type ReactNode} from "react"
import {AnimatePresence, motion} from "framer-motion"
import Link from "next/link"
import styles from "./FlyoutLink.module.css"

interface FlyoutLinkProps {
    children: ReactNode
    href: string
    FlyoutContent: React.FC
    className?: string
}

const FlyoutLink: React.FC<FlyoutLinkProps> = ({children, href, FlyoutContent, className = ""}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsOpen(true)
        }
    }

    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsOpen(false)
        }
    }

    const handleClick = (e: React.MouseEvent) => {
        if (isMobile) {
            e.preventDefault()
            setIsOpen(!isOpen)
        }
    }

    const handleBackdropClick = () => {
        if (isMobile) {
            setIsOpen(false)
        }
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
             className={`${styles.container} ${className}`}>
            <Link href={href} className={styles.link} onClick={handleClick}>
                {children}
                <span
                    style={{
                        transform: isOpen ? "scaleX(1)" : "scaleX(0)",
                    }}
                    className={styles.underline}
                />
            </Link>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {isMobile && (
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                onClick={handleBackdropClick}
                            />
                        )}
                        <motion.div
                            initial={{opacity: 0, y: isMobile ? 50 : 15, scale: isMobile ? 0.95 : 1}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0, y: isMobile ? 50 : 15, scale: isMobile ? 0.95 : 1}}
                            style={{translateX: isMobile ? "0" : "-50%"}}
                            transition={{duration: 0.3, ease: "easeOut"}}
                            className={styles.dropdown}
                        >
                            {!isMobile && <div className={styles.transparentArea}/>}
                            {!isMobile && <div className={styles.arrow}/>}
                            <FlyoutContent/>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FlyoutLink
