import React from "react";
import html2canvas from "html2canvas";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import ElementModal from "./ElementModal";

const Text = () => {
  return (
    <div>
      <MathpixLoader>
        <MathpixMarkdown text="yo yo \\(ax^2 + bx + c = 0\\)" />
      </MathpixLoader>
    </div>
  );
};

const TextImage = () => {
  return () => {
    let imgData;

    const input = () => {
      return (
        <ElementModal show={true}>
          <Text />
        </ElementModal>
      );
    };
    html2canvas(input).then((canvas) => {
      imgData = canvas.toDataURL("image/png");
    });
    return imgData;
  };
};

export default TextImage;
