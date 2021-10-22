import Image from "next/image";
import styles from "./ImageSliderModal.module.scss";

function ImageSliderModal() {
  return (
    <div className={styles.modalDialog} id="openModal-about">
      <div>
        <div className={styles.closeHeader}>
          <Image
            src="/images/close.svg"
            alt="close"
            className={styles.close}
            width="20"
            height="20"
          />
        </div>
        <div className={styles.image}>
          <Image
            src="/images/imgone.png"
            alt="img one"
            height="100%"
            width="100%"
            className={styles.imageSize}
          />
        </div>
      </div>
    </div>
  );
}

export default ImageSliderModal;
