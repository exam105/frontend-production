import { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import Link from "next/link";
import styles from "./HomeComponent.module.scss";
import { useDispatch } from "react-redux";
import { getSearchPapers } from "../../services/searchSlice";
import { normalizeDate } from "@lib/normalizeDate";

function HomeComponent() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [date, setDate] = useState("");
  const [isDateRange, setIsDateRange] = useState(false);
  const [boards, setBoards] = useState([]);

  const [systems] = useState([
    { key: 0, value: "GCSE", text: "system", label: "GCSE" },
    { key: 1, value: "IGCSE", text: "system", label: "IGCSE" },
    { key: 2, value: "AS", text: "system", label: "AS" },
    { key: 3, value: "A Level", text: "system", label: "A Level" },
    { key: 4, value: "O Level", text: "system", label: "O Level" },
    { key: 5, value: "Pre U", text: "system", label: "Pre U" },
    { key: 6, value: "IB", text: "system", label: "IB" },
  ]);
  const [paper, setPaper] = useState({
    subject: "",
    system: "",
    board: "",
    date: "",
    from_date: "",
    to_date: "",
  });

  const [subjects] = useState([
    { key: 0, value: "Math", text: "subject", label: "Math" },
    { key: 1, value: "Physics", text: "subject", label: "Physics" },
    { key: 2, value: "Biology", text: "subject", label: "Biology" },
    { key: 3, value: "Chemistry", text: "subject", label: "Chemistry" },
  ]);
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

  const change_start_month_and_year = (e) => {
    const newDate = normalizeDate(e.target.value);
    setStartDate(newDate);
    setPaper({ ...paper, from_date: startDate });
  };
  const change_end_month_and_year = (e) => {
    const newDate = normalizeDate(e.target.value);
    setEndDate(newDate);
    setPaper({ ...paper, to_date: endDate });
  };
  const change_month_and_year = (e) => {
    const newDate = normalizeDate(e.target.value);
    setDate(newDate);
    setPaper({ ...paper, date: date });
  };

  return (
    <div className="content-width">
      <div className={styles.homeContent}>
        <h1 className={styles.heading}>
          Welcome to
          <span className={styles.textGreen}> EXAM105 Platform.</span> Here you
          can Explore and Download Cambridge board past papers. You can even
          download your customized eBook composed of different questions from
          different papers.
        </h1>

        <div className={styles.searchBox}>
          <div className={`${styles.searchFields} ${styles.mobileResponsive}`}>
            {/* <form className={styles.searchContainer}>
              <input type="text" id="home-search-bar" placeholder="System" />
              <Link href="#">
                <a>
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </Link>
            </form> */}
            <Select
              className={styles.select}
              maxMenuHeight="80"
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
            {/* <form className={styles.searchContainer}>
              <input type="text" id="home-search-bar" placeholder="Board" />
              <Link href="#">
                <a>
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </Link>
            </form> */}
          </div>

          <div
            className={`${styles.searchFields} ${styles.mobileResponsive} ${styles.mobile}`}
          >
            {/* <form className={styles.searchContainer}>
              <input type="text" id="home-search-bar" placeholder="Subject" />
              <Link href="#">
                <a>
                  <i
                    className={`fa fa-search ${styles.searchIcon} ${styles.iconSize}`}
                  ></i>
                </a>
              </Link>
            </form> */}
            <Select
              className={styles.select}
              options={subjects}
              placeholder="Subject"
              onChange={change_input}
              required
            />
          </div>

          <div className={`${styles.searchFields} ${styles.mobileResponsive}`}>
            <div
              className={`${styles.searchContainer} ${styles.dateResponsive} ${styles.dateMargin}`}
            >
              <div className={styles.radioHead}>
                <div className={styles.radioBtn}>
                  <label className={styles.radioButton}>
                    Date {isDateRange && "(Start Date)"}
                    <input
                      type="radio"
                      name="radio"
                      value="date"
                      checked={isDateRange === false}
                      onChange={(e) =>
                        e.currentTarget.value === "date"
                          ? setIsDateRange(false)
                          : ""
                      }
                      className={styles.radioHead}
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

            <div
              className={`${styles.dateResponsive} ${styles.searchContainer}`}
            >
              <div className={styles.radioHead}>
                <div className={styles.radioBtn}>
                  <label className={styles.radioButton}>
                    Date Range {isDateRange && "(End Date)"}
                    <input
                      type="radio"
                      name="radio"
                      value="daterange"
                      onChange={(e) =>
                        e.currentTarget.value === "daterange"
                          ? setIsDateRange(true)
                          : ""
                      }
                      className={styles.radioHead}
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
          </div>
        </div>

        <div className={styles.searchButton}>
          <div className={styles.loginBtn}>
            <Link href="/search">
              <a
                onClick={() => {
                  paper["choice"] = isDateRange ? "daterange" : "date";
                  // removing the slashes from within dates
                  if (isDateRange) {
                    let newFromDate = paper.from_date?.replace(/\\/g, "");
                    paper.from_date = newFromDate;
                    let newToDate = paper.to_date?.replace(/\\/g, "");
                    paper.to_date = newToDate;
                  } else {
                    let newDate = paper.date?.replace(/\\/g, "");
                    paper.date = new Date(newDate);
                    console.log("haza paper: ", newDate, paper);
                  }
                  dispatch(getSearchPapers(paper));
                  delete paper["choice"];
                }}
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
