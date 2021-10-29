import { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import styles from "./SearchComponent.module.scss";
import { SearchedPaperCard } from "../SearchedPaperCard";
import { useSelector } from "react-redux";
import { subjects, systems } from "@lib/papersData";
import { normalizeDate } from "@lib/normalizeDate";
import { useDispatch } from "react-redux";
import { getSearchPapers } from "../../services/searchSlice";

function SearchComponent() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [date, setDate] = useState("");
  const [isDateRange, setIsDateRange] = useState(false);
  const [boards, setBoards] = useState([]);
  const [paper, setPaper] = useState({
    subject: "",
    system: "",
    board: "",
    date: "",
    from_date: "",
    to_date: "",
  });
  const change_input = (e) => {
    if (e[0].text === "system") {
      if (e[0].value === "GCSE") {
        setBoards([
          { key: 0, value: "Edexcel", text: "board", label: "Edexcel" },
          { key: 1, value: "AQA", text: "board", label: "AQA" },
          { key: 2, value: "OCR", text: "board", label: "OCR" },
          { key: 3, value: "CCEA", text: "board", label: "CCEA" },
        ]);
      } else if (e[0].value === "IGCSE") {
        setBoards([
          { key: 0, value: "Edexcel", text: "board", label: "Edexcel" },
          { key: 7, value: "CIE", text: "board", label: "CIE" },
        ]);
      } else if (e[0].value === "AS" || e[0].value === "A Level") {
        setBoards([
          { key: 4, value: "Edexcel", text: "board", label: "Edexcel" },
          { key: 5, value: "AQA", text: "board", label: "AQA" },
          { key: 6, value: "OCR", text: "board", label: "OCR" },
          { key: 7, value: "CIE", text: "board", label: "CIE" },
          {
            key: 8,
            value: "Edexcel IAL",
            text: "board",
            label: "Edexcel IAL",
          },
        ]);
      } else if (e[0].value === "O Level" || e[0].value === "Pre U") {
        setBoards([{ key: 7, value: "CIE", text: "board", label: "CIE" }]);
      } else if (e[0].value === "IB") {
        setBoards([
          {
            key: 9,
            value: "No Board",
            text: "board",
            label: "No Board",
            status: "disable",
          },
        ]);
      }
    }
    setPaper({ ...paper, [e[0].text]: e[0].value });
  };
  const { data, pending } = useSelector((state) => state.papers);

  const change_start_month_and_year = (e) => {
    e.preventDefault();
    const newDate = normalizeDate(e.target.value);
    setStartDate(newDate);
    setPaper({ ...paper, from_date: newDate });
  };
  const change_end_month_and_year = (e) => {
    e.preventDefault();
    const newDate = normalizeDate(e.target.value);
    setEndDate(newDate);
    setPaper({ ...paper, to_date: newDate });
  };
  const change_month_and_year = (e) => {
    e.preventDefault();
    const newDate = normalizeDate(e.target.value);
    setDate(newDate);
    setPaper({ ...paper, date: newDate });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    paper["choice"] = isDateRange ? "daterange" : "date";
    dispatch(getSearchPapers(paper));
    delete paper["choice"];
  };
  return (
    <div>
      <div className="content-width">
        <div className={styles.homeContent}>
          <div className={styles.searchBox}>
            <div
              className={`${styles.searchFields} ${styles.mobileResponsive}`}
            >
              <Select
                className={styles.select}
                options={systems}
                placeholder="System"
                onChange={change_input}
                required
              />
              <Select
                className={styles.select}
                options={boards}
                placeholder="Board"
                onChange={change_input}
                required
              />

              <Select
                className={styles.select}
                options={subjects}
                placeholder="Subject"
                onChange={change_input}
                required
              />
              {/* <form className={styles.searchContainer}>
                <input type="text" id="search-bar" placeholder="System" />
                <a href="#">
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </form>

              <form className={styles.searchContainer}>
                <input type="text" id="search-bar" placeholder="Board" />
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
              </form> */}
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
                        Date {isDateRange && "(Start Date)"}
                        <input
                          type="radio"
                          name="radio"
                          className={`${styles.radioHead}`}
                          value="date"
                          checked={isDateRange === false}
                          onChange={(e) =>
                            e.currentTarget.value === "date"
                              ? setIsDateRange(false)
                              : ""
                          }
                        />
                        <span className={styles.checkmark}></span>
                      </label>
                    </div>
                    <input
                      className={styles.inputDate}
                      type="date"
                      name="startDate"
                      id="startDate"
                      required
                      onChange={
                        isDateRange
                          ? change_start_month_and_year
                          : change_month_and_year
                      }
                    />
                  </div>
                </div>

                <div className={`${styles.dateResponsive} ${styles.last}`}>
                  <div className={`${styles.radioHead}`}>
                    <div className={styles.radioBtn}>
                      <label className={styles.radioButton}>
                        Date Range {isDateRange && "(End Date)"}
                        <input
                          type="radio"
                          name="radio"
                          className={`${styles.radioHead}`}
                          value="daterange"
                          onChange={(e) =>
                            e.currentTarget.value === "daterange"
                              ? setIsDateRange(true)
                              : ""
                          }
                        />
                        <span className={styles.checkmark}></span>
                      </label>
                    </div>
                    {isDateRange && (
                      <input
                        className={styles.inputDate}
                        type="date"
                        name="endDate"
                        id="endDate"
                        required
                        onChange={change_end_month_and_year}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.searchButton}>
                  <div className={styles.loginBtn}>
                    <button onClick={onSubmit} className="btn-style sign">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}

      {pending ? (
        "Loading..."
      ) : data ? (
        <div className="content-width">
          <div className={styles.mainBox}>
            <div className={`${styles.gridLogoss} ${styles.logos}`}>
              {/* mapping through the data */}
              {data
                ? data.map((paper, i) => {
                    return <SearchedPaperCard paper={paper} key={i} />;
                  })
                : "We didn't find any papers matching your criteria."}
            </div>
            <div className={`${styles.searchButton} ${styles.buttonMargin}`}>
              <div className={styles.loginBtn}>
                {/* <button className="btn-style sign">Read More</button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        "There was some error while fetching the data. We will take notice of the problem and fix at our earliest."
      )}
    </div>
  );
}

export default SearchComponent;
