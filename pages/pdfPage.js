import React from "react";
import ElementModal from "@/components/ElementModal";
import Onepdf from "@/components/Onepdf";
import { PDFViewer } from "@react-pdf/renderer";

export default function PdfPage() {
  return (
    <ElementModal show={true}>
      <PDFViewer
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: "0",
          left: "0",
        }}
        showToolbar
        width={100}
        height={100}
      >
        <Onepdf />
      </PDFViewer>
    </ElementModal>
  );
}
