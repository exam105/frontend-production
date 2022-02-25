import { useState } from "react";
import Image from "next/image";
import styles from "./ImageSliderModal.module.css";
import Magnifier from "react-magnifier";

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
  // const prevStyle = () => {
  //   const prevImage = data[data.indexOf(currentImage) - 1];

  //   return {
  //     color: prevImage ? "black" : "gray",
  //   };
  // };
  // const nextStyle = () => {
  //   const nextImage = data[data.indexOf(currentImage) + 1];

  //   return {
  //     color: nextImage ? "black" : "gray",
  //   };
  // };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          <Magnifier
            src={currentImage.imageurl}
            // src="https://exam105.s3-ap-southeast-1.amazonaws.com/Chemistry/Igcse_edexcel_1_2012_paper2_ques_4(c).jpg"
            mgShape="square"
            mgWidth={450}
            mgHeight={450}
            className={`${styles.imageSize}`}
            width={400}
            zoomFactor={0.3}
          />
          {/* <img
            src={currentImage.imageurl}
            // src="https://exam105.s3-ap-southeast-1.amazonaws.com/Chemistry/Igcse_edexcel_1_2012_paper2_ques_4(c).jpg"
            alt={currentImage.imageurl}
            // layout="fill"
            className={styles.imageSize}
          /> */}
        </div>
      </div>
      <div className={styles.buttonHead}>
        <div className={styles.button}>
          <div className={styles.buttonBack} onClick={loadPrevImage}>
            <Image
              // style={prevStyle()}
              src="/images/back.svg"
              alt="back"
              className={styles.backFooter}
              width="69"
              height="19"
            />
            Back
          </div>
          <div
            // style={nextStyle()}
            onClick={loadNextImage}
            className={styles.buttonBack}
          >
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
