import styles from "./SearchedPaperComponent.module.scss";

function SearchedPaperComponent({ paper }) {
  return (
    <div className={`${styles.gridLogos__itemm} ${styles.card}`}>
      <div className={styles.cardContent}>
        <div className={styles.cardHead}>
          <div className={styles.blueColor}>
            <p>{paper.system}</p>
          </div>
          <div className={styles.blueColor}>
            <p>{paper.board}</p>
          </div>
          <div className={styles.grayColor}>
            <p>Qs: {paper.question_hex_ids.length}</p>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.blackColor}>
            <p>{paper.subject}</p>
          </div>
          <div className={styles.blackColor}>
            <p>
              {new Date(paper.date).toLocaleString("default", {
                month: "long",
              })}{" "}
              {new Date(paper.date).getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchedPaperComponent;
