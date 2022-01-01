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
  const quesImages = data?.images?.filter((image) =>
    image.imageurl.includes("ques")
  );
  const ansImages = data?.images?.filter((image) =>
    image.imageurl.includes("ans")
  );

  const { questionsPending, questionsError } = useSelector(
    (state) => state.questions
  );
  const { questionsData, paperData } = useSelector(
    (state) => state.questions.data
  );

  useEffect(() => {
    // Resetting qeustionRef in order to get questions list on initial render
    questionRef.current = false;

    let url = window.location.pathname;
    url = url?.split("search").pop();
    setQuestionId(url?.split("/").pop());
    url = url?.substring(url?.indexOf("/") + 1);
    let id = url?.split("/");
    setPaperId(id[0]);
    return () => localStorage.removeItem("secondPageUrl");
  }, []);

  useEffect(() => {
    // loading relevant question if back button of browser is pressed
    if (router.query.questionId) {
      setQuestionId(router.query.questionId);
      setSelectedQuestionId(router.query.questionId);
    }
  }, [router.query.questionId]);

  useEffect(() => {
    if (questionId) {
      router.push(`/search/${paperId}/${questionId}`, undefined, {
        shallow: true,
      });
      dispatch(getQuestion(questionId));
    }
  }, [questionId]);
  useEffect(() => {
    // when the data has the message property, it means an error has occured
    if (data.message) {
      router.push("/500");
    }
  }, [data.message]);
  useEffect(() => {
    if (
      data.id &&
      paperId &&
      (questionRef.current === null || questionRef.current === false)
    ) {
      if (data.options) {
        dispatch(getQuestions(paperId, false));
      } else {
        dispatch(getQuestions(paperId, true));
      }
      questionRef.current = true;
    }
  }, [data]);

  useEffect(() => {
    if (questionsData[0]?.id) {
      setSelectedQuestionId(data.id);
    }
  }, [questionsData]);

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
            <div
              onClick={() => {
                if (localStorage.getItem("secondPageUrl")) {
                  router.push(`${localStorage.getItem("secondPageUrl")}`);
                } else {
                  router.push("/search");
                }
              }}
            >
              <a>
                <Image
                  src="/images/back.svg"
                  width="30"
                  height="19"
                  alt="back"
                  className={styles.back}
                />
              </a>
            </div>
            <div
              onClick={() => {
                if (localStorage.getItem("secondPageUrl")) {
                  router.push(`${localStorage.getItem("secondPageUrl")}`);
                } else {
                  router.push("/search");
                }
              }}
            >
              <a>
                <span
                  style={{
                    marginLeft: "10px",
                    marginBottom: "1px",
                    color: "gray",
                  }}
                >
                  Back
                </span>
              </a>
            </div>
          </div>
          {/* <div
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
          </div> */}
        </div>
        {paperData.id && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 15px",
            }}
          >
            <div>
              {paperData.system} - {paperData.board} - {paperData.subject}
            </div>
            <div>
              {new Date(paperData.date).toLocaleString("default", {
                month: "long",
              })}{" "}
              / {new Date(paperData.date).getFullYear()}
            </div>
          </div>
        )}
        <div className={styles.sidenavList}>
          {/* map through questions */}
          {questionsData[0]?.id ? (
            questionsData.map((question, i) => {
              return (
                <div
                  key={question.id}
                  className={`${styles.sidenavListItem} ${styles.plusIcon}`}
                  onClick={() => {
                    loadQuestion(question.id);
                    setSelectedQuestionId(question.id);
                  }}
                >
                  <div
                    style={{
                      backgroundColor:
                        selectedQuestionId === question.id ? "#34a853" : "",
                      color: selectedQuestionId === question.id ? "#fff" : "",
                    }}
                    className={styles.questionNo}
                  >
                    {i + 1}
                  </div>
                  {/* <div
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
                  </div> */}
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
            <div
              className={`${styles.sidenavListItem}`}
              style={{ color: "red" }}
            >
              There was some problem.
            </div>
          ) : data.message ? (
            <div
              className={`${styles.sidenavListItem}`}
              style={{ color: "red" }}
            >
              Server-side error occured.
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
          quesImages={quesImages}
          ansImages={ansImages}
        />
      )}

      <Modal onClose={() => setShowBookModal(false)} show={showBookModal}>
        <BookModal />
      </Modal>
    </div>
  );
}

export default QuestionsComponent;
