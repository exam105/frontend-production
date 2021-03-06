import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { resetQuestion } from "@components/QuestionsComponent/questionSlice";
import { resetQuestions } from "@components/QuestionsComponent/questionsSlice";
import styles from "./SearchedPaperCard.module.css";
import ButtonLoader from "@components/common/ButtonLoader";

function SearchedPaperComponent({ paper }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);
  const resetData = () => {
    dispatch(resetQuestion());
    dispatch(resetQuestions());
  };

  return (
    <Link
      onClick={() => {
        setIsLoading(true);
      }}
      href={`/search/${paper.id}/${paper.question_hex_ids[0]}`}
      passHref
    >
      <div
        style={{
          position: "relative",
          borderLeft:
            paper.notes && paper.notes === "Practical"
              ? "4px solid #00ff00"
              : paper.is_theory
              ? "4px solid #FFFF00"
              : "4px solid #0000FF",
        }}
        onClick={() => {
          setIsLoading(true);
          sessionStorage.setItem("secondPageUrl", window.location.href);
          resetData();
          router.push(`/search/${paper.id}/${paper.question_hex_ids[0]}`);
        }}
        className={`${styles.gridLogos__itemm} ${styles.card}`}
      >
        <div className={styles.cardContent}>
          {/* System - Board - Quetions Length */}
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

          {/* Subject - Month/Year */}
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

        {isLoading && (
          <ButtonLoader
            fontSize="7px"
            position="absolute"
            margin="-1.3rem 0rem 0rem 0rem"
            left="50%"
          />
        )}

        {paper?.reference && (
          <div className={styles.referenceContainer}>
            {paper.reference &&
              paper.reference.split(",").map((value, index) => {
                return (
                  <p key={index} className={styles.singleReference}>
                    {value}{" "}
                  </p>
                );
              })}
          </div>
        )}
      </div>
    </Link>
  );
}

export default SearchedPaperComponent;
