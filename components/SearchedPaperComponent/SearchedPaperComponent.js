import styles from "./SearchedPaperComponent.module.css";

function SearchedPaperComponent() {
  return (
    <div className={`${styles.gridLogos__itemm} ${styles.card}`}>
      <div className={styles.cardContent}>
        <div className={styles.cardHead}>
          <div className={styles.blueColor}>
            <p>IGCSE</p>
          </div>
          <div className={styles.blueColor}>
            <p>Edexcel</p>
          </div>
          <div className={styles.grayColor}>
            <p>Qs: 25</p>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.blackColor}>
            <p>Math</p>
          </div>
          <div className={styles.blackColor}>
            <p>June 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchedPaperComponent;
