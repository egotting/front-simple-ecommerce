import styles from './header.module.css';


export function Header() {
    return (
        <header>
            <div className={styles.divMain}>
                <nav className={styles.nav}>
                    <div className={styles.logoContainer}>
                        <h1 className={styles.logo}>
                            Ecommerce
                        </h1>
                    </div>
                    <a href="">Home</a>
                    <a href="">Products</a>
                    <a href="">Categories</a>
                    <a href="">About</a>
                    <a href="">Contact Us</a>
                    <a href=""></a>
                    <div className={styles.userContainer}>
                        <a href="/sign-in" className={styles.signin}>Sign In</a>
                        <a href="/sign-up" className={styles.signup}><b>Sign Up</b></a>
                    </div>
                </nav>
            </div>
        </header>
    )
}