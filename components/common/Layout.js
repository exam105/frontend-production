import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div style={{ height: "inherit", height: "auto" }}>{children}</div>
      <Footer />
    </div>
  );
}
//first page auto, second page inherit
Layout.defaultProps = {
  title: "Exam105 | Find the past papers",
  description: "Find cambridge board past papers",
  keywords: "pastpapers, cambridge, alevel, olevel, igcse, gcse, ib, preu",
};
