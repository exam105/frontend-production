import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { SingleQuestion } from "@components/SingleQuestion";
import { Modal } from "@components/common/Modals";
import { BookModal } from "@components/common/Modals";
import styles from "./QuestionsComponent.module.css";
import { getQuestion } from "@services/questionSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getQuestions } from "@services/questionsSlice";
import Loader from "@components/common/Loader";

function QuestionsComponent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const questionRef = useRef(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [paperId, setPaperId] = useState("");
  const [questionCart, setQuestionCart] = useState(0);
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  // Getting individual question
  const { data, pending, error } = useSelector((state) => state.question);
  // Getting all questions list
  const {
    data: questionsData,
    pending: questionsPending,
    error: questionsError,
  } = useSelector((state) => state.questions);

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
      router.push(`/search/${paperId}/${questionId}`, undefined, {
        shallow: true,
      });
      dispatch(getQuestion(questionId));
    }
  }, [questionId]);
  useEffect(() => {
    console.log(questionRef);
    if (data.id && questionRef.current === null) {
      if (data.options) {
        console.log("data: ", data ? data : "");
        dispatch(getQuestions(paperId, false));
      } else {
        console.log("data: ", data ? data : "");
        dispatch(getQuestions(paperId, true));
      }
      questionRef.current = true;
    }
  }, [data]);
  useEffect(() => {
    if (questionsData[0].id) {
      console.log("questionsData: ", questionsData ? questionsData : "");
      setSelectedQuestionId(data.id);
    }
  }, [questionsData, questionsPending]);

  const loadQuestion = (id) => {
    setQuestionId(id);
  };
  const loadPrevQuestion = () => {
    let index = questionsData.findIndex((question) => question.id === data.id);
    if (index > 0) {
      setQuestionId(questionsData[index - 1].id);
      setSelectedQuestionId(questionsData[index - 1].id);
    }
  };
  const loadNextQuestion = () => {
    let index = questionsData.findIndex((question) => question.id === data.id);
    if (index < questionsData.length - 1) {
      setQuestionId(questionsData[index + 1].id);
      setSelectedQuestionId(questionsData[index + 1].id);
    }
  };
  return (
    <div className={styles.gridContainer}>
      <aside className={styles.sidenav}>
        <div className={styles.sidenavTop}>
          <div className={styles.textBack}>
            <Link href="/search/" passHref>
              <a>
                <Image
                  src="/images/back.svg"
                  width="70"
                  height="19"
                  alt="back"
                  style={{ marginTop: "10px", marginRight: "-10px" }}
                />
              </a>
            </Link>
            <span>Back</span>
          </div>

          <div
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
            <div style={{ marginLeft: "10px" }}>{questionCart}</div>
          </div>
        </div>

        <div className={styles.sidenavList}>
          {/* map through questions */}
          {questionsData[0].id ? (
            questionsData.map((question, i) => {
              return (
                <div
                  key={question.id}
                  className={`${styles.sidenavListItem} ${styles.plusIcon}`}
                  onClick={() => {
                    loadQuestion(question.id);
                    setSelectedQuestionId(question.id);
                  }}
                  style={{
                    backgroundColor:
                      selectedQuestionId === question.id
                        ? "#f5f5f5"
                        : "transparent",
                  }}
                >
                  {/* <div>
                      <MathpixLoader>
                        <MathpixMarkdown text={question.question} />
                      </MathpixLoader>
                    </div> */}
                  <div>Question no: {i + 1}</div>
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
            })
          ) : questionsPending ? (
            <Loader fontSize="15px" />
          ) : questionsData === null ? (
            <div className={`${styles.sidenavListItem}`}>
              No questions found
            </div>
          ) : questionsError || error ? (
            <div className={`${styles.sidenavListItem}`}>
              There was some problem.
            </div>
          ) : (
            <Loader fontSize="15px" />
          )}
        </div>
      </aside>
      {data.question && (
        <SingleQuestion
          loadPrevQuestion={() => loadPrevQuestion()}
          loadNextQuestion={() => loadNextQuestion()}
          data={data}
          pending={pending}
          error={error}
        />
      )}

      <Modal onClose={() => setShowBookModal(false)} show={showBookModal}>
        <BookModal />
      </Modal>
    </div>
  );
}

export default QuestionsComponent;
