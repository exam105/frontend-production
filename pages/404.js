import Link from "next/link";
import { Layout } from "@components/common";
import styles from "../styles/404.module.css";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>
            <FaExclamationTriangle style={{ marginRight: "20px" }} />
            404
          </h1>
          <h4>Sorry, there is nothing here</h4>
          <Link href="/">Go Back to Home</Link>
        </div>
      </div>
    </Layout>
  );
}
