import React, { useState } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
// import useSWR from "swr";
import ElementModal from "@/components/ElementModal";
import PdfSample from "@/components/PdfSample";
import { PDFViewer } from "@react-pdf/renderer";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import TextImage from "@/components/TextImage";

export default function ContactPage() {
  const [showPaper, setShowPaper] = useState(false);

  // const user = {
  //   subject: "Math",
  //   system: "GCSE",
  //   board: "Edexcel",
  //   date: "2021-02-01T00:00:00.000Z",
  // };
  // const fetcher = (url) =>
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   }).then((res) => res.json());

  // const { data, error } = useSWR(
  //   "http://dev.exam105.com:9090/dashboard/de/search/date",
  //   fetcher
  // );

  // if (error) return console.log("error: ", error);
  // if (!data) return console.log("loading ");
  // if (data) {
  //   console.log("data: ", data);
  // }
  // const savePdf = () => {
  //   ReactPDF.render(<PdfSample />, `example.pdf`);
  // };

  return (
    <Layout title={"Contact Us"}>
      Contact Us
      {/* <button
        onClick={() => {
          setShowPaper(true);
          // savePdf();
        }}
      >
        generate sample pdf */}
      {/* </button> */}
      <MathpixLoader>
        <MathpixMarkdown text="\\(ax^2 + bx + c = 0\\)" />
      </MathpixLoader>
      <Image src={<TextImage />} alt="error" />
      <a target="_blank" href={`/pdfPage`} rel="noopener noreferrer">
        <button
          style={{
            marginLeft: "5rem",
            display: "inline-block",
            padding: "0.35em 1.2em",
            border: "0.1em solid black",
            borderRadius: "0.12em",
            boxSizing: "border-box",
            textDecoration: "none",
            fontFamily: "'Roboto',sans-serif",
            fontWeight: "300",
            color: "black",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          Go To new page pdf
        </button>
      </a>
      {showPaper && (
        <div
          style={{
            width: "80vh",
            height: "80vh",
            marginLeft: "10vh",

            position: "absolute",
            top: "0",
            left: "0",
          }}
        >
          <ElementModal show={showPaper}>
            <PDFViewer>
              <PdfSample />
            </PDFViewer>
          </ElementModal>
        </div>
      )}
    </Layout>
  );
}
