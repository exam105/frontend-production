import Image from "next/image";
import { Fragment } from "react";
import styles from "./BookModal.module.scss";

function BookModal() {
  return (
    <Fragment>
      <div className={styles.modalContent}>
        <p className={styles.numbers}>01</p>
        <p style={{ width: "50%" }} className={styles.questionDetail}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal .......
        </p>
        <p className={styles.first}>IGCSE</p>
        <p className={styles.first}>Edexcel</p>
        <p className={styles.second}>Math</p>
        <p className={styles.third}>June 2021</p>
        <div className={styles.cancelIcon}>
          <Image src="/images/cancel.svg" alt="cancel" width="10" height="10" />
        </div>
      </div>

      <div className={styles.modalContent}>
        <p className={styles.numbers}>01</p>
        <p style={{ width: "50%" }} className={styles.questionDetail}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal .......
        </p>
        <p className={styles.first}>IGCSE</p>
        <p className={styles.first}>Edexcel</p>
        <p className={styles.second}>Math</p>
        <p className={styles.third}>June 2021</p>
        <div className={styles.cancelIcon}>
          <Image
            src="/images/cancel.svg"
            alt="cancelit"
            width="10"
            height="10"
          />
        </div>
      </div>
    </Fragment>
  );
}

export default BookModal;
