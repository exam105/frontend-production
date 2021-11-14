import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div style={{ height: "100vh" }}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Exam105 | Find the past papers",
  description: "Find cambridge board past papers",
  keywords: "pastpapers, cambridge, alevel, olevel, igcse, gcse, ib, preu",
};
