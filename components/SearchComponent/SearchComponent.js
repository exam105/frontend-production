import styles from "./SearchComponent.module.css";
import { SearchedPaperComponent } from "@/components/SearchedPaperComponent";
import { useSelector } from "react-redux";

function SearchComponent() {
  const { data, pending, error } = useSelector((state) => state.papers);
  if (pending) return "Loading...";

  return (
    <div>
      <div className="content-width">
        <div className={styles.homeContent}>
          <div className={styles.searchBox}>
            <div
              className={`${styles.searchFields} ${styles.mobileResponsive}`}
            >
              <form className={styles.searchContainer}>
                <input type="text" id="search-bar" placeholder="Subject" />
                <a href="#">
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </form>

              <form className={styles.searchContainer}>
                <input type="text" id="search-bar" placeholder="Subject" />
                <a href="#">
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </form>

              <form className={styles.searchContainer}>
                <input type="text" id="search-bar" placeholder="Subject" />
                <a href="#">
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </form>

              <form className={styles.last}>
                <input type="text" id="search-bar" placeholder="Subject" />
                <a href="#">
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </form>
            </div>

            <div className={styles.searchBoxx}>
              <div
                className={`${styles.searchFields} ${styles.mobileResponsive}`}
              >
                <div
                  className={`${styles.searchContainer} ${styles.dateResponsive} ${styles.dateMargin}`}
                >
                  <div className={`${styles.radioHead}`}>
                    <div className={styles.radioBtn}>
                      <label className={styles.radioButton}>
                        Date
                        <input
                          type="radio"
                          name="radio"
                          className={`${styles.radioHead}`}
                        />
                        <span className={styles.checkmark}></span>
                      </label>
                    </div>
                    <input
                      className={styles.inputDate}
                      type="date"
                      name="dateofbirth"
                      id="dateofbirth"
                    />
                  </div>
                </div>

                <div className={`${styles.dateResponsive} ${styles.last}`}>
                  <div className={`${styles.radioHead}`}>
                    <div className={styles.radioBtn}>
                      <label className={styles.radioButton}>
                        Date Range
                        <input
                          type="radio"
                          name="radio"
                          className={`${styles.radioHead}`}
                        />
                        <span className={styles.checkmark}></span>
                      </label>
                    </div>
                    <input
                      className={styles.inputDate}
                      type="date"
                      name="dateofbirth"
                      id="dateofbirth"
                    />
                  </div>
                </div>
                <div className={styles.searchButton}>
                  <div className={styles.loginBtn}>
                    <button className="btn-style sign">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}

      <div className="content-width">
        <div className={styles.mainBox}>
          <div className={`${styles.gridLogoss} ${styles.logos}`}>
            {/* mapping through the data */}
            {data.map((paper, i) => {
              <SearchedPaperComponent paper={paper} key={i} />;
            })}
          </div>
          <div className={`${styles.searchButton} ${styles.buttonMargin}`}>
            <div className={styles.loginBtn}>
              <button className="btn-style sign">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
