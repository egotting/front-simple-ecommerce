"use client";

import React, {useState, type ReactNode} from "react"
import styles from "../Header/header.module.css";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";


interface FlyoutLinkProps {
    children: ReactNode;
    href: string;
    FlyoutContent: React.ComponentType;
}

const FlyoutLink: React.FC<FlyoutLinkProps> = ({
                                                   children,
                                                   href,
                                                   FlyoutContent,
                                               }) => {
    const [open, setOpen] = useState(false);
    const showFlyout = FlyoutContent && open;

    return (
        <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className={styles.flyoutContainer}
        >
            <Link href={href} className={styles.flyoutLink}>
                {children}
                <span
                    style={{
                        transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
                    }}
                    className={styles.flyout_underline}
                ></span>
            </Link>
            <AnimatePresence>
                {showFlyout && (
                    <motion.div
                        initial={{opacity: 0, y: 15}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 15}}
                        style={{translateX: "-50%"}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                        className={styles.flyoutContent}
                    >
                        <div className={styles.flyoutTransparentArea}/>
                        <div className={styles.flyoutArrow}/>
                        <FlyoutContent/>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const PricingContent: React.FC = () => {
    return (
        <div className={styles.priceContainer}>
            <div className={styles.pricingSection}>
                <h3 className={styles.pricingHeading}>Making your Keybaord</h3>
                <Link href="/products/split-keyboards" className={styles.pricingLink}>
                    Split Keyboards
                </Link>
                <Link href="/products/keyboards" className={styles.pricingLink}>
                    Keyboards
                </Link>
            </div>
            <div className={styles.pricingSectionLast}>
                <h3 className={styles.pricingHeading}> Components </h3>

                <Link href="/products/keycaps" className={styles.pricingLink}>
                    Keycaps
                </Link>
                <Link href="/products/switchs" className={styles.pricingLink}>
                    Switchs
                </Link>
                <Link href="/products/layouts" className={styles.pricingLink}>
                    Layouts
                </Link>
            </div>

            <h3 className={styles.pricingHeading}>If you want a custom Keyboard</h3>
            <button className={styles.pricingBtn}>Contact Us</button>
        </div>
    );
};

export {FlyoutLink, PricingContent};
