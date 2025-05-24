import styles from "./header.module.css";
import Image from "next/image";
import car from "../../../public/car.png";
import profile from "../../../public/account.png";
import {FlyoutLink, PricingContent} from "@/Components/FlyoutMenu";

export function Header() {
    return (
        <header>
            <div className={styles.divMain}>
                <nav className={styles.nav}>
                    <div className={styles.logoContainer}>
                        <h1 className={styles.logo}>Ecommerce</h1>
                    </div>

                    <a href="#home" target={"_blank"}>
                        Home
                    </a>
                    <FlyoutLink href="#" FlyoutContent={PricingContent}>
                        Products
                    </FlyoutLink>
                    <a href="#Categories" target={"_blank"}>
                        Categories
                    </a>
                    <a href="#About" target={"_blank"}>
                        About
                    </a>
                    <a href="#Contact" target={"_blank"}>
                        Contact Us
                    </a>

                    <div className={styles.user}>
                        <a href="/my-cart" target={"_blank"}>
                            <Image src={car} alt="Shopping cart" className={styles.mycar}/>
                        </a>
                        <a href="/profile" target={"_blank"} hidden={true}>
                            <Image
                                src={profile}
                                alt="Profile"
                                className={styles.iconprofile}
                            ></Image>
                        </a>
                        <a
                            href="/sign-up"
                            target={"_blank"}
                            className={styles.signin}
                            hidden={false}
                        >
                            Sign Up
                        </a>
                        <a
                            href="/sign-in"
                            target={"_blank"}
                            className={styles.signup}
                            hidden={false}
                        >
                            <b>Sign In</b>
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}
