"use client"
import styles from './page.module.css';
import { Link } from 'react-router-dom';
import img from '/dyjc.png';

export default function Home() {

    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <img src={img} alt="Logo" />
            </div>
            <div className={styles.grid}>
                <Link
                    to="/standard"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                    标准方剂-&gt;
                </Link>
                <Link
                    to="/patient"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                    患者 -&gt;
                </Link>
                <Link
                    to="/recipe"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                    处方 -&gt;
                </Link>
            </div>
        </main>
    );
}
