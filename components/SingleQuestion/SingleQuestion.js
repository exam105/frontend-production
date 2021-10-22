import { ImageSliderModal } from "@components/common/Modals";
import Image from "next/image";
import Link from "next/link";
import styles from "./SingleQuestion.module.scss";

function SingleQuestion() {
  return (
    <main className={styles.main}>
      <div className={styles.badgeHeader}>
        <span className={`${styles.badge} ${styles.badgePrimary}`}>
          established
        </span>
        <span className={`${styles.badge} ${styles.badgePrimary}`}>
          Computer science
        </span>
        <span className={`${styles.badge} ${styles.badgePrimary}`}>
          Lorem ipsum
        </span>
        <span className={`${styles.badge} ${styles.badgePrimary}`}>
          establish
        </span>
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.questionMain}>
          <div className={styles.questionHead}>
            <p className={styles.questionText}>Question no: 1</p>
            <p className={styles.questionMarks}>Marks 5</p>
          </div>

          <div className={styles.question}>
            <ul className={styles.alphaStyle}>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don&apos;t look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn&apos;t anything
                embarrassing hidden in the middle of text. There are many
                variations of passages of Lorem Ipsum available, but the
                majority.
              </p>
              <br />
              <li>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don&apos;t look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn&apos;t anything
                embarrassing hidden in the middle of text.
              </li>
              <br />
              <li>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don&apos;t look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.mainOverview}>
        <div className={styles.overviewcard}>
          <Image
            src="/images/imgone.png"
            alt="questionone"
            height="180"
            width="60%"
          />
        </div>
        <div className={styles.overviewcard}>
          <Image
            src="/images/imgtwo.png"
            alt="questiontwo"
            width="400"
            height="180"
          />
        </div>
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.questionMain}>
          <div className={styles.questionHead}>
            <p className={styles.solutionText}>Solution</p>
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
        {/* <Link href="#openModal-img"> */}
        <a
          onClick={() => {
            console.log("im also here");
            return <ImageSliderModal />;
          }}
        >
          <div className={styles.overviewcard}>
            <Image
              src="/images/imgone.png"
              alt="questionone"
              height="180"
              width="60%"
            />
          </div>
        </a>
        {/* </Link> */}
        <div className={styles.overviewcard}>
          <Image
            src="/images/imgtwo.png"
            alt="questiontwo"
            width="400"
            height="180"
          />
        </div>
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
    </main>
  );
}

export default SingleQuestion;