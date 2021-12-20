import styles from "./Loader.module.css";

function Loader({ fontSize, margin }) {
  return (
    <div className={styles.loadsss}>
      <div className={styles.load5}>
        <div
          className={styles.loader}
          style={{ fontSize: fontSize, margin: margin }}
        ></div>
      </div>
    </div>
  );
}

export default Loader;
