import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerBorder}>
      <div className="content-width">
        <footer className={styles.footerContainer}>
          <div className="desktop">
            <div className="footer-content">
              <div className="logo">
                <h1>logo</h1>
              </div>
              <div className={styles.footerLinks}>
                <ul>
                  <li className={styles.grayColor}>
                    <Link href="#">
                      <a className={styles.noStyle}>About </a>
                    </Link>
                  </li>
                  <li className={styles.grayColor}>
                    <Link href="#">
                      <a className={styles.noStyle}>Contact us </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
