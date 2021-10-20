import Image from "next/image";
import styles from "./SelectBox.module.scss";

function SelectBox({ children, name }) {
  return (
    <div className={styles.selectBox}>
      <div className={styles.selectBox__current} tabIndex="1">
        <div className={styles.selectBox__value}>
          <input
            className={styles.selectBox__input}
            type="radio"
            id="0"
            value="1"
            name="Ben"
            checked="checked"
          />
          <p className={styles.selectBox__inputText}>
            {children[0][`${name}`]}
          </p>
        </div>
        {children.map((child, i) => {
          if (i === 0) return;
          return (
            <div key={i} className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id={i}
                value={i + 1}
                name="Ben"
              />
              <p className={styles.selectBox__inputText}>{child[`${name}`]}</p>
            </div>
          );
        })}

        {/* <div className="selectBox__value">
          <input
            className="selectBox__input"
            type="radio"
            id="0"
            value="1"
            name="Ben"
            checked="checked"
          />
          <p className="selectBox__inputText">Blah</p>
        </div>
        <div className="selectBox__value">
          <input
            className="selectBox__input"
            type="radio"
            id="1"
            value="2"
            name="Ben"
          />
          <p className="selectBox__inputText">Cheese</p>
        </div>
        <div className="selectBox__value">
          <input
            className="selectBox__input"
            type="radio"
            id="2"
            value="3"
            name="Ben"
          />
          <p className="selectBox__inputText">Milk</p>
        </div>
        <div className="selectBox__value">
          <input
            className="selectBox__input"
            type="radio"
            id="3"
            value="4"
            name="Ben"
          />
          <p className="selectBox__inputText">Honey</p>
        </div>
        <div className="selectBox__value">
          <input
            className="selectBox__input"
            type="radio"
            id="4"
            value="5"
            name="Ben"
          />
          <p className="selectBox__inputText">Toast</p>
        </div> */}
        <Image
          className={styles.selectBox__icon}
          src="/images/arrow-up.webp"
          alt="Arrow Icon"
          aria-hidden="true"
          width="20"
          height="20"
        />
      </div>
      <ul className={styles.selectBox__list}>
        {children.map((child, i) => {
          return (
            <li key={i}>
              <label
                className={styles.selectBox__option}
                htmlFor={i}
                aria-hidden="aria-hidden"
              >
                {child[`${name}`]}
              </label>
            </li>
          );
        })}
        {/* <li>
          <label
            className="selectBox__option"
            htmlFor="0"
            aria-hidden="aria-hidden"
          >
            Cream
          </label>
        </li>
        <li>
          <label
            className="selectBox__option"
            htmlFor="1"
            aria-hidden="aria-hidden"
          >
            Cheese
          </label>
        </li>
        <li>
          <label
            className="selectBox__option"
            htmlFor="2"
            aria-hidden="aria-hidden"
          >
            Milk
          </label>
        </li>
        <li>
          <label
            className="selectBox__option"
            htmlFor="3"
            aria-hidden="aria-hidden"
          >
            Honey
          </label>
        </li>
        <li>
          <label
            className="selectBox__option"
            htmlFor="4"
            aria-hidden="aria-hidden"
          >
            Toast
          </label>
        </li> */}
      </ul>
    </div>
  );
}

export default SelectBox;
