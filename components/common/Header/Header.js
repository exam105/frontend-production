import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <div className={styles.navBorder}>
      <div className="content-width">
        {/* Header */}
        <header className={styles.headerContainer}>
          <div className="logo">
            {/* <h1>logo</h1> */}
            <Link href="/" passHref>
              <Image
                src="/images/exam105.png"
                alt="logo"
                className={styles.logo}
                width="150"
                height="60"
              />
            </Link>
          </div>
          {/* <div className={styles.loginBtn}>
            <h3 className={styles.login}>Login</h3>
            <button className="btn-style sign">Sign up</button>
          </div> */}
        </header>
      </div>
    </div>
  );
}
