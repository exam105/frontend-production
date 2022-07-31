import { ImageSliderModal, Modal } from "@components/common/Modals";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./SingleQuestion.module.css";
import { MathpixMarkdown, MathpixLoader } from "mathpix-markdown-it";
import Loader from "@components/common/Loader";
import { FiCopy } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleQuestion({
  data,
  loadPrevQuestion,
  loadNextQuestion,
  pending,
  error,
  quesImages,
  ansImages,
}) {
  const [showImageSliderModal, setShowImageSliderModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ansImagesSlider, setAnsImagesSlider] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("reveal") === "true") {
      setReveal(true);
    }
  }, []);

  const shareQuestion = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Question link copied!");
  };
  return (
    <main className={styles.main}>
      <div
        className={styles.mainContent}
        style={{ height: "100vh", overflowX: "hidden", overflowY: "auto" }}
      >
        <ToastContainer />
        {pending && <Loader />}
        {error && <div>There was some problem fetching the data.</div>}
        {!pending && !error && (
          <>
            <div className={styles.topicsLane}>
              <div>
                {data.topics && (
                  <div className={styles.badgeHeader}>
                    {/* map through topics in data */}
                    {data.topics
                      ? data.topics.map((topic, index) => (
                          <span
                            key={index}
                            className={`${styles.badge} ${styles.badgePrimary}`}
                          >
                            {topic.topic}
                          </span>
                        ))
                      : ""}
                  </div>
                )}
              </div>
              <div>
                <FiCopy
                  className={styles.share}
                  onClick={() => shareQuestion()}
                  size={25}
                />
              </div>
            </div>

            <div className={styles.mainHeader}>
              <div className={styles.questionMain}>
                <div className={styles.questionHead}>
                  <p className={styles.questionText}>Question:</p>
                  <p className={styles.questionMarks}>Marks: {data?.marks}</p>
                </div>

                <div className={`${styles.question} markdown-body`}>
                  <MathpixLoader>
                    <MathpixMarkdown
                      // style={{ margin: "unset", padding: "unset" }}
                      text={data?.question}
                    />
                  </MathpixLoader>
                </div>
              </div>
              <p className={styles.questionText}>
                {quesImages && quesImages.length > 0 ? "Images:" : ""}
              </p>
            </div>

            <div className={styles.mainOverview}>
              {quesImages?.length !== 0
                ? quesImages?.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.overviewcard}
                        // onClick={() => {
                        //   setAnsImagesSlider(false);
                        //   setCurrentImageIndex(index);
                        //   setShowImageSliderModal(true);
                        // }}
                      >
                        <div className={styles.cardImageContainer}>
                          {/* <img
                            src="https://exam105.s3-ap-southeast-1.amazonaws.com/Chemistry/Igcse_edexcel_1_2012_paper2_ques_4(c).jpg"
                            alt="blah"
                            className={styles.cardImage}
                          /> */}
                          <img
                            src={image.imageurl}
                            alt={image.imageurl}
                            // width={100}
                            // height={100}
                            className={styles.cardImage}
                          />
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>

            <div className={styles.mainHeader}>
              <div className={styles.questionMain}>
                <div className={styles.questionHead}>
                  <p className={styles.questionText}>
                    {data.answer ? "Answer:" : "Options:"}
                  </p>
                  <span className={styles.revealCheckbox}>
                    <button
                      onClick={() => {
                        setReveal(!reveal);
                        localStorage.setItem("reveal", !reveal);
                      }}
                      style={
                        reveal
                          ? { color: "#268dec", backgroundColor: "#ffffff" }
                          : { color: "#ffffff", backgroundColor: "#268dec" }
                      }
                      className={styles.revealBtn}
                    >
                      {data.options ? (
                        <>
                          {reveal
                            ? "Hide the correct option"
                            : "Reveal the correct option"}
                        </>
                      ) : (
                        <>{reveal ? "Hide the answer" : "Reveal the answer"}</>
                      )}
                    </button>
                  </span>
                </div>

                <div className={styles.answerText}>
                  {data.answer ? (
                    <>
                      {reveal && (
                        <MathpixLoader>
                          <MathpixMarkdown text={data.answer} />
                        </MathpixLoader>
                      )}
                    </>
                  ) : (
                    <div className={styles.options}>
                      {data.options?.map((option, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            paddingTop: "10px",
                          }}
                        >
                          {reveal === true && (
                            <>
                              {option.correct === true ? (
                                <Image
                                  src="/images/check-new.svg"
                                  width="24"
                                  height="0"
                                  alt="correct"
                                />
                              ) : (
                                <Image
                                  src="/images/wrong.svg"
                                  width="22"
                                  height="5"
                                  alt="wrong"
                                  className="wrong"
                                />
                              )}
                            </>
                          )}
                          {reveal === false && (
                            <div style={{ marginTop: "10px" }}>
                              <FaCircle
                                width={22}
                                height={22}
                                className="wrong"
                                color="#2e382e"
                              />
                            </div>
                          )}
                          &nbsp;&nbsp;
                          <p
                            style={{
                              borderBottom: "1px solid rgba(0,0,0,0.3)",
                              marginLeft: "10px",
                            }}
                          >
                            {" "}
                            {option.option}
                          </p>
                          {/* <MathpixLoader>{option}</MathpixLoader> */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className={styles.questionText}>
                {ansImages && ansImages.length > 0 && reveal ? "Images:" : ""}
              </p>
            </div>

            <div className={styles.mainOverview}>
              {ansImages?.length !== 0 && reveal
                ? ansImages?.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.overviewcard}
                        // onClick={() => {
                        //   setAnsImagesSlider(true);
                        //   setCurrentImageIndex(index);
                        //   setShowImageSliderModal(true);
                        // }}
                      >
                        <div className={styles.cardImageContainer}>
                          {/* <img
                            src="https://exam105.s3-ap-southeast-1.amazonaws.com/Chemistry/Igcse_edexcel_1_2012_paper2_ques_4(c).jpg"
                            alt="blah"
                            className={styles.cardImage}
                          /> */}
                          <img
                            src={image.imageurl}
                            alt={image.imageurl}
                            // width={100}
                            // height={100}
                            className={styles.cardImage}
                          />
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
            <div className={styles.buttonHead}>
              <div className={styles.button}>
                <div className={styles.buttonBack} onClick={loadPrevQuestion}>
                  <Image
                    src="/images/back.svg"
                    alt="back"
                    className={styles.backFooter}
                    width="69"
                    height="19"
                  />
                  Back
                </div>
                <div onClick={loadNextQuestion} className={styles.buttonBack}>
                  Next
                  <Image
                    src="/images/next.svg"
                    alt="next"
                    className={styles.nextFooter}
                    width="70"
                    height="19"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <Modal
          titleMessage={
            "Hover with your mouse over the image to apply magnifier"
          }
          onClose={() => setShowImageSliderModal(false)}
          show={showImageSliderModal}
        >
          <ImageSliderModal
            data={ansImagesSlider ? ansImages : quesImages}
            currentImageIndex={currentImageIndex}
          />
        </Modal>
      </div>
    </main>
  );
}

export default SingleQuestion;
