import styles from "./page.module.css";
import {Header} from "@/Components/Header";

export default function Home() {
    return (
        <div>
            <Header/>
            <main className={styles.main}>
                <h1>teste</h1>
            </main>
        </div>
    );
}
