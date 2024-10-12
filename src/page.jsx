"use client"
import styles from './page.module.css';
import { Link } from 'react-router-dom';
import img from '/dyjc.png';

export default function Home() {

    return (
        <div>
            <div className={styles.center}>
                <img src={img} alt="Logo" />
            </div>
            <div className={styles.grid}>
                <a
                    href="/standard"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                    标准方剂-&gt;
                </a>
                <a
                    href="/patient"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                    患者 -&gt;
                </a>
                <a
                    href="/recipe"
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                    处方 -&gt;
                </a>
            </div>
        </div>
    );
}
