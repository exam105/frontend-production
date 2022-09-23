import { ImageSliderModal, Modal } from "@components/common/Modals";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./SingleQuestion.module.css";
import { MathpixMarkdown, MathpixLoader } from "mathpix-markdown-it";
import Loader from "@components/common/Loader";
import { FiCopy } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Collapsible from "react-collapsible";
import { IoIosArrowDown } from "react-icons/io";
import Toggle from "react-toggle";
import "react-toastify/dist/ReactToastify.css";
import "react-toggle/style.css";

function SingleQuestion({
  data,
  loadPrevQuestion,
  loadNextQuestion,
  pending,
  error,
  quesImages,
  ansImages,
  selectedQuestionId,
}) {
  const [showImageSliderModal, setShowImageSliderModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ansImagesSlider, setAnsImagesSlider] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("reveal") === "true") {
      setReveal(true);
      setCollapse(true);
    }
  }, []);
  useEffect(() => {
    setCollapse(reveal);
  }, [reveal, selectedQuestionId]);

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
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginLeft: "40px",
                marginTop: "5px",
                marginBottom: "20px",
                gap: "8px",
              }}
            >
              <Toggle
                // defaultChecked={reveal}
                checked={!reveal}
                icons={false}
                onChange={() => {
                  setReveal(!reveal);
                  localStorage.setItem("reveal", !reveal);
                }}
              />
              <span>Hide all answers</span>
            </label>
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
                <div
                  className={styles.questionHead}
                  style={{ position: "relative" }}
                >
                  {data.answer && (
                    <div
                      className={styles.answerText}
                      style={{ paddingTop: "10px" }}
                    >
                      <Collapsible
                        open={collapse}
                        triggerStyle={{
                          cursor: "pointer",
                          fontSize: "1.2rem",
                          width: "100%",
                          position: "absolute",
                          top: "0",
                          right: "0",
                        }}
                        trigger={
                          <span
                            style={{
                              color: "#268dec",
                              display: "flex",
                              gap: "10px",
                            }}
                            onClick={() => {
                              setCollapse(!collapse);
                            }}
                          >
                            <p
                              style={{ color: "black" }}
                              className={styles.questionText}
                            >
                              {data.answer ? "Answer:" : "Options:"}
                            </p>
                            <span
                              style={{
                                paddingTop: "2px",
                              }}
                            >
                              {collapse ? "Hide Answer" : "Show Answer"}
                              <span
                                style={{
                                  position: "relative",
                                  top: "2px",
                                  marginLeft: "10px",
                                }}
                              >
                                <IoIosArrowDown
                                  color="#268dec"
                                  className="rotate"
                                  style={{
                                    transform: collapse
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                  }}
                                />
                              </span>
                            </span>
                          </span>
                        }
                      >
                        <MathpixLoader>
                          <MathpixMarkdown text={data.answer} />
                        </MathpixLoader>
                      </Collapsible>
                    </div>
                  )}
                  {data.options && (
                    <div
                      className={styles.answerText}
                      style={{
                        display: "flex",
                        gap: "10px",
                        // justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p
                        style={{ color: "black" }}
                        className={styles.questionText}
                      >
                        Options:
                      </p>
                      <span className={styles.revealCheckbox}>
                        <button
                          onClick={() => {
                            setCollapse(!collapse);
                          }}
                          style={
                            collapse
                              ? { color: "#268dec", backgroundColor: "#ffffff" }
                              : { color: "#ffffff", backgroundColor: "#268dec" }
                          }
                          className={styles.revealBtn}
                        >
                          {collapse ? "Hide Answer" : "Show Answer"}
                        </button>
                      </span>
                    </div>
                  )}
                </div>

                <div className={styles.answerText}>
                  {data.options && (
                    <div className={styles.options}>
                      {data.options?.map((option, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            paddingTop: "10px",
                          }}
                        >
                          {collapse === true && (
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
                          {collapse === false && (
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
                {ansImages && ansImages.length > 0 && collapse ? "Images:" : ""}
              </p>
            </div>

            <div className={styles.mainOverview}>
              {ansImages?.length !== 0 && collapse
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
