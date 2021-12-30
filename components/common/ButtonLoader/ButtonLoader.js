import styles from "./ButtonLoader.module.css";

function ButtonLoader({ fontSize, margin, position, left }) {
  return (
    <div className={styles.loadsss}>
      <div className={styles.load5}>
        <div
          className={styles.loader}
          style={{
            fontSize: fontSize,
            margin: margin,
            position: position,
            left: left,
          }}
        ></div>
      </div>
    </div>
  );
}

export default ButtonLoader;
