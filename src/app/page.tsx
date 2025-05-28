import styles from "./page.module.css";
import {Header} from "@/Components/Header";

export default function Home() {
    return (
        <div>
            <Header/>
            <main className={styles.main}>
                <h1 className={styles.principalText}>
                    Lorem ipsum dolor sit amet, <br/>
                    consectetur adipisicing elit.
                </h1>
                <h4>Expedita illum numquam suscipit!</h4>
                <button className={styles.btnProducts}>Buy</button>
            </main>
            <footer></footer>
        </div>
    );
}
