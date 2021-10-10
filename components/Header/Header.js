import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.navBorder}>
      <div className="content-width">
        {/* Header */}
        <header className={styles.headerContainer}>
          <div className="logo">
            <h1>logo</h1>
          </div>
          <div className={styles.loginBtn}>
            <h3 className={styles.login}>Login</h3>
            <button className="btn-style sign">Sign up</button>
          </div>
        </header>
      </div>
    </div>
  );
}
