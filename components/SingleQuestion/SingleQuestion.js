import { ImageSliderModal, Modal } from "@components/common/Modals";
import Image from "next/image";
import { useState } from "react";
import styles from "./SingleQuestion.module.scss";
import { MathpixMarkdown, MathpixLoader } from "mathpix-markdown-it";

function SingleQuestion({ data }) {
  const [showImageSliderModal, setShowImageSliderModal] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.badgeHeader}>
        {/* map through topics in data */}
        {data.topics.map((topic, index) => (
          <span
            key={index}
            className={`${styles.badge} ${styles.badgePrimary}`}
          >
            {topic.topic}
          </span>
        ))}
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.questionMain}>
          <div className={styles.questionHead}>
            <p className={styles.questionText}>Question:</p>
            <p className={styles.questionMarks}>Marks: {data.marks}</p>
          </div>

          <div className={styles.question}>
            <MathpixLoader>
              <MathpixMarkdown text={data.question} />
            </MathpixLoader>
          </div>
        </div>
      </div>

      <div className={styles.mainOverview}>
        {data.images.map((image, index) => (
          <div
            key={index}
            className={styles.overviewcard}
            onClick={() => setShowImageSliderModal(true)}
          >
            <Image
              src={image.imageurl}
              alt={image.imageurl}
              width={200}
              height={200}
            />
          </div>
        ))}
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
            <p className={styles.solutionText}>Answer:</p>
          </div>

          <div className={styles.answerText}>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn&apos;t anything embarrassing
              hidden in the middle of text. There are many variations of
              passages of Lorem Ipsum available, but the majority.{" "}
            </p>
            <br />
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn&apos;t anything embarrassing
              hidden in the middle of text.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.mainOverview}>
        {data.images.map((image, index) => (
          <div
            key={index}
            className={styles.overviewcard}
            onClick={() => setShowImageSliderModal(true)}
          >
            <Image
              src={image.imageurl}
              alt={image.imageurl}
              width={200}
              height={200}
            />
          </div>
        ))}
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
          <div className={styles.buttonBack}>
            <Image
              src="/images/back.svg"
              alt="back"
              className={styles.backFooter}
              width="69"
              height="19"
            />
            Back
          </div>
          <div className={styles.buttonBack}>
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
      <Modal
        onClose={() => setShowImageSliderModal(false)}
        show={showImageSliderModal}
      >
        <ImageSliderModal />
      </Modal>
    </main>
  );
}

export default SingleQuestion;
