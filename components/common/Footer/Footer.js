import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <div className={styles.footerBorder}>
      <div className="content-width">
        <footer className={styles.footerContainer}>
          <div className="desktop">
            <div className={styles.footerContent}>
              {/* <div className="logo">
                <h1>logo</h1>
              </div> */}
              <Link href="/" passHref>
                <Image
                  src="/images/exam105.png"
                  alt="logo"
                  className={styles.logo}
                  width="150"
                  height="60"
                />
              </Link>
              <div className={styles.footerLinks}>
                <span>
                  {/* // <li className={styles.grayColor}>
                  //   <Link href="#">
                  //     <a className={styles.noStyle}>About </a>
                  //   </Link>
                  // </li> */}
                  {/* <li className={styles.grayColor}>
                    <Link href="#">
                      <>
                        <div className="navigation-icon-wrap">
                          <img
                            src="https://uploads-ssl.webflow.com/60bb6d060e2152bdbe5d49cc/60bb6d070e21528c365d49e9_Mail%20Icon.svg"
                            alt="mail icon"
                            className="navigation-mail"
                            loading="lazy"
                          />

                          <span className={styles.noStyle}>Contact us </span>
                        </div>
                      </>
                    </Link>
                  </li> */}
                </span>
                <span className={styles.icons}>
                  <Link passHref href={"#"}>
                    <FaFacebookF
                      className={`${styles.socialIcon} ${styles.facebook}`}
                    />
                  </Link>
                  <Link passHref href={"#"}>
                    <FaDiscord
                      className={`${styles.socialIcon} ${styles.discord}`}
                    />
                  </Link>
                  <Link passHref href={"#"}>
                    <FaLinkedinIn
                      className={`${styles.socialIcon} ${styles.linkedin}`}
                    />
                  </Link>
                  <Link passHref href={"mailto:muhammad@exam105.com"}>
                    <FaEnvelope className={styles.socialIcon} />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
