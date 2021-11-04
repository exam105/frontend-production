import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { SingleQuestion } from "@components/SingleQuestion";
import { Modal } from "@components/common/Modals";
import { BookModal } from "@components/common/Modals";
import styles from "./QuestionsComponent.module.scss";
import { getQuestion } from "@services/questionSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getQuestions } from "@services/questionsSlice";

function QuestionsComponent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showBookModal, setShowBookModal] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [paperId, setPaperId] = useState("");
  const [questionCart, setQuestionCart] = useState(0);
  // Getting individual question
  const { data, pending } = useSelector((state) => state.question);
  // Getting all questions list
  const { data: questionsData, pending: questionsPending } = useSelector(
    (state) => state.questions
  );

  useEffect(() => {
    let url = window.location.pathname;
    url = url?.split("search").pop();
    setQuestionId(url?.split("/").pop());
    url = url?.substring(url?.indexOf("/") + 1);
    let id = url?.split("/");
    setPaperId(id[0]);
  }, []);

  useEffect(() => {
    if (questionId) {
      dispatch(getQuestion(questionId));
    }
  }, [questionId]);
  useEffect(() => {
    if (data.id) {
      if (data.options) {
        console.log("data: ", data ? data : "");
        dispatch(getQuestions(paperId, false));
      } else {
        console.log("data: ", data ? data : "");
        dispatch(getQuestions(paperId, true));
      }
    }
    if (pending) {
      console.log("loading...");
    }
  }, [data, pending]);
  useEffect(() => {
    if (questionsData[0].id) {
      console.log("questionsData: ", questionsData ? questionsData : "");
    }
    if (questionsPending) {
      console.log("Loading questionsList");
    }
    console.log(router.pathname);
  }, [questionsData, questionsPending]);
  return (
    <div className={styles.gridContainer}>
      <aside className={styles.sidenav}>
        <div className={styles.sidenavTop}>
          <div className={styles.textBack}>
            <Image
              src="/images/back.svg"
              width="70"
              height="19"
              className={styles.icons}
              alt="back"
            />{" "}
            Back
          </div>
          <a
            className={`${styles.textSelect} ${styles.booksText}`}
            onClick={() => {
              setShowBookModal(true);
            }}
          >
            <Image
              className={styles.icons}
              src="/images/book.svg"
              alt="books"
              width="28"
              height="23"
            />
            {questionCart}
          </a>
        </div>

        <div className={styles.sidenavList}>
          {/* map through questions */}
          {questionsData.map((question) => {
            return (
              <div
                key={question.id}
                className={`${styles.sidenavListItem} ${styles.plusIcon}`}
              >
                <div>{question.question}</div>
                <div
                  onClick={() => {
                    let number = questionCart;
                    number++;
                    setQuestionCart(number);
                  }}
                >
                  <Image
                    src="/images/plusColor.svg"
                    alt="plus"
                    width="14"
                    height="14"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </aside>
      <SingleQuestion data={data} />
      <Modal onClose={() => setShowBookModal(false)} show={showBookModal}>
        <BookModal />
      </Modal>
    </div>
  );
}

export default QuestionsComponent;
