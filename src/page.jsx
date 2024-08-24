"use client"
import styles from './page.module.css';
import img from '/dyjc.png';

export default function Home() {  
  
  return (
    <main className={styles.main}>
      <div className={styles.center}>
              <img src={img} alt="Logo" />
      </div>

      <div className={styles.grid}>
        <a
          href="/standardRecipe"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
          标准方剂 <span>-&gt;</span>
          </h2>
        </a>

        <a
          href="/patient"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            患者 <span>-&gt;</span>
          </h2>
        </a>

        <a
          href="/recipe"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            处方 <span>-&gt;</span>
          </h2>
          
        </a>

        
      </div>
    </main>
  );
}
