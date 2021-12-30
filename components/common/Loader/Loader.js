import styles from "./Loader.module.css";

function Loader({ fontSize, margin, position }) {
  return (
    <div style={{ position: position }} className={styles.loadsss}>
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
