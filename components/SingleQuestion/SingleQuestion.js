import { ImageSliderModal, Modal } from "@components/common/Modals";
import Image from "next/image";
import { useState } from "react";
import styles from "./SingleQuestion.module.css";
import { MathpixMarkdown, MathpixLoader } from "mathpix-markdown-it";
import Loader from "@components/common/Loader";

function SingleQuestion({
  data,
  loadPrevQuestion,
  loadNextQuestion,
  pending,
  error,
}) {
  const [showImageSliderModal, setShowImageSliderModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <main className={styles.main}>
      {pending && <Loader />}
      {error && <div>There was some problem fetching the data.</div>}
      {!pending && !error && (
        <>
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

          <div className={styles.mainHeader}>
            <div className={styles.questionMain}>
              <div className={styles.questionHead}>
                <p className={styles.questionText}>Question:</p>
                <p className={styles.questionMarks}>Marks: {data?.marks}</p>
              </div>

              <div className={styles.question}>
                <MathpixLoader>
                  <MathpixMarkdown text={data?.question} />
                </MathpixLoader>
              </div>
            </div>
            <p className={styles.questionText}>
              {data?.images && data?.images.length > 0 ? "Images:" : ""}
            </p>
          </div>

          <div className={styles.mainOverview}>
            {data.images?.length !== 0
              ? data.images?.map((image, index) => (
                  <div
                    key={index}
                    className={styles.overviewcard}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setShowImageSliderModal(true);
                    }}
                  >
                    <Image
                      src={image.imageurl}
                      alt={image.imageurl}
                      width={200}
                      height={200}
                    />
                  </div>
                ))
              : ""}
            {/* <a onClick={() => setShowImageSliderModal(true)}>
          <div className={styles.overviewcard}>
            <Image
              src="/images/imgone.png"
              alt="questionone"
              height="180"
              width="60%"
            />
          </div>
            </a>
            <a onClick={() => setShowImageSliderModal(true)}>
              <div className={styles.overviewcard}>
                <Image
                  src="/images/imgtwo.png"
                  alt="questiontwo"
                  width="400"
                  height="180"
                />
              </div>
            </a> */}
          </div>

          <div className={styles.mainHeader}>
            <div className={styles.questionMain}>
              <div className={styles.questionHead}>
                <p className={styles.solutionText}>
                  {data.answer ? "Answer:" : "Options:"}
                </p>
              </div>

              <div className={styles.answerText}>
                {data.answer ? (
                  () => (
                    <MathpixLoader>
                      <MathpixMarkdown text={data.answer} />
                    </MathpixLoader>
                  )
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
                        {option.correct === true ? (
                          <Image
                            src="/images/check.png"
                            width="20"
                            height="16"
                            alt="correct"
                          />
                        ) : (
                          <Image
                            src="/images/uncheck.png"
                            width="20"
                            height="16"
                            alt="wrong"
                          />
                        )}
                        &nbsp;&nbsp;
                        <p
                          style={{ borderBottom: "1px solid rgba(0,0,0,0.3)" }}
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
              {data?.images && data?.images.length > 0 ? "Images:" : ""}
            </p>
          </div>

          <div className={styles.mainOverview}>
            {data.images?.length !== 0
              ? data.images?.map((image, index) => (
                  <div
                    key={index}
                    className={styles.overviewcard}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setShowImageSliderModal(true);
                    }}
                  >
                    <Image
                      src={image.imageurl}
                      alt={image.imageurl}
                      width={200}
                      height={200}
                    />
                  </div>
                ))
              : ""}
            {/* <a onClick={() => setShowImageSliderModal(true)}>
                <div className={styles.overviewcard}>
                  <Image
                    src="/images/imgone.png"
                    alt="questionone"
                    height="180"
                    width="60%"
                  />
                </div>
              </a>
              <a onClick={() => setShowImageSliderModal(true)}>
                <div className={styles.overviewcard}>
                  <Image
                    src="/images/imgtwo.png"
                    alt="questiontwo"
                    width="400"
                    height="180"
                  />
                </div>
              </a> */}
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
        onClose={() => setShowImageSliderModal(false)}
        show={showImageSliderModal}
      >
        <ImageSliderModal
          data={data.images}
          currentImageIndex={currentImageIndex}
        />
      </Modal>
    </main>
  );
}

export default SingleQuestion;
