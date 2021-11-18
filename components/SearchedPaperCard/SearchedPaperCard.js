import Link from "next/link";
import { useDispatch } from "react-redux";
import { resetQuestion } from "@services/questionSlice";
import { resetQuestions } from "@services/questionsSlice";
import styles from "./SearchedPaperCard.module.css";

function SearchedPaperComponent({ paper }) {
  const dispatch = useDispatch();
  const resetData = () => {
    dispatch(resetQuestion());
    dispatch(resetQuestions());
  };

  return (
    <Link href={`/search/${paper.id}/${paper.question_hex_ids[0]}`} passHref>
      <div
        onClick={() => resetData()}
        className={`${styles.gridLogos__itemm} ${styles.card}`}
      >
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
    </Link>
  );
}

export default SearchedPaperComponent;
