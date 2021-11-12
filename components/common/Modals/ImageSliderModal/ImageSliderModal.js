import { useState } from "react";
import Image from "next/image";
import styles from "./ImageSliderModal.module.css";

function ImageSliderModal({ data, currentImageIndex }) {
  const [currentImage, setCurrentImage] = useState(data[currentImageIndex]);

  const loadPrevImage = () => {
    const prevImage = data[data.indexOf(currentImage) - 1];
    if (prevImage) {
      setCurrentImage(prevImage);
    }
  };
  const loadNextImage = () => {
    const nextImage = data[data.indexOf(currentImage) + 1];
    if (nextImage) {
      setCurrentImage(nextImage);
    }
  };

  return (
    <div className={styles.image}>
      <Image
        src={currentImage.imageurl}
        alt={currentImage.imageurl}
        layout="fill"
        className={styles.imageSize}
      />
      <div className={styles.buttonHead}>
        <div className={styles.button}>
          <div className={styles.buttonBack} onClick={loadPrevImage}>
            <Image
              src="/images/back.svg"
              alt="back"
              className={styles.backFooter}
              width="69"
              height="19"
            />
            Back
          </div>
          <div onClick={loadNextImage} className={styles.buttonBack}>
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
    </div>
  );
}

export default ImageSliderModal;
