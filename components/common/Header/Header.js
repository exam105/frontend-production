import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.navBorder}>
      <div className="content-width">
        {/* Header */}
        <header className={styles.headerContainer}>
          <Link href="/" passHref>
            <div className="logo">
              <h1>logo</h1>
            </div>
          </Link>

          <div className={styles.loginBtn}>
            <h3 className={styles.login}>Login</h3>
            <button className="btn-style sign">Sign up</button>
          </div>
        </header>
      </div>
    </div>
  );
}
