import Link from "next/link";
import { Layout } from "@components/common";
import styles from "../styles/404.module.css";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ServerErrorPage() {
  return (
    <Layout>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle style={{ marginRight: "20px" }} />
          500
        </h1>
        <h4>Server-side error occurred</h4>
        <Link href="/">Go Back to Home</Link>
      </div>
    </Layout>
  );
}
