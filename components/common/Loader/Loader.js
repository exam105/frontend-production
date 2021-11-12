import styles from "./Loader.module.css";

function Loader({ fontSize }) {
  return (
    <div className={styles.load5}>
      <div className={styles.loader} style={{ fontSize: fontSize }}></div>
    </div>
  );
}

export default Loader;
