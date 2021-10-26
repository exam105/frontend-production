import Image from "next/image";
import styles from "./ImageSliderModal.module.scss";

function ImageSliderModal() {
  return (
    <div className={styles.image}>
      <Image
        src="/images/imgone.png"
        alt="img one"
        layout="fill"
        className={styles.imageSize}
      />
    </div>
  );
}

export default ImageSliderModal;
