import Link from "next/link";
import styles from "./HomeComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSearchPapers, selectSearch } from "@/services/searchSlice";
import { useEffect } from "react";

function HomeComponent() {
  const dispatch = useDispatch();
  const { data, pending, error } = useSelector((state) => state.searchPapers);
  useEffect(() => {
    console.log("this is data: ", data);
    console.log("error: ", error);
  }, [data, error]);
  if (pending) return "Loading...";

  return (
    <div className="content-width">
      <div className={styles.homeContent}>
        <h1 className={styles.heading}>
          There are many
          <span className={styles.textGreen}> variations of passages</span> of
          Lorem Ipsum available There are many variations.
        </h1>

        <div className={styles.searchBox}>
          <div className={`${styles.searchFields} ${styles.mobileResponsive}`}>
            <form className={styles.searchContainer}>
              <input type="text" id="home-search-bar" placeholder="Subject" />
              <Link href="#">
                <a>
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </Link>
            </form>

            <form className={styles.searchContainer}>
              <input type="text" id="home-search-bar" placeholder="Subject" />
              <Link href="#">
                <a>
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </Link>
            </form>
          </div>

          <div
            className={`${styles.searchFields} ${styles.mobileResponsive} ${styles.mobile}`}
          >
            <form className={styles.searchContainer}>
              <input type="text" id="home-search-bar" placeholder="Subject" />
              <Link href="#">
                <a>
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </Link>
            </form>

            <form className={styles.searchContainer}>
              <input type="text" id="home-search-bar" placeholder="Subject" />
              <Link href="#">
                <a>
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </Link>
            </form>
          </div>

          <div className={`${styles.searchFields} ${styles.mobileResponsive}`}>
            <div
              className={`${styles.searchContainer} ${styles.dateResponsive} ${styles.dateMargin}`}
            >
              <div className={styles.radioHead}>
                <div className={styles.radioBtn}>
                  <label className={styles.radioButton}>
                    Date
                    <input
                      type="radio"
                      name="radio"
                      className={styles.radioHead}
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

            <div
              className={`${styles.dateResponsive} ${styles.searchContainer}`}
            >
              <div className={styles.radioHead}>
                <div className={styles.radioBtn}>
                  <label className={styles.radioButton}>
                    Date Range
                    <input
                      type="radio"
                      name="radio"
                      className={styles.radioHead}
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
          </div>
        </div>

        <div className={styles.searchButton}>
          <div className={styles.loginBtn}>
            <Link href="/search">
              <a
                onClick={() => dispatch(getSearchPapers())}
                className="btn-style sign"
              >
                Search
              </a>
            </Link>
            {/* <button className="btn-style sign">Search</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
