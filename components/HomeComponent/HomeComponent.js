import { useState, useEffect, useRef } from "react";
import Select from "react-dropdown-select";
import Link from "next/link";
import styles from "./HomeComponent.module.css";
import { useDispatch } from "react-redux";
import { getSearchPapers } from "../../services/searchSlice";
import { normalizeDate } from "@lib/normalizeDate";
import { subjects, systems } from "@lib/papersData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { S3_USERNAME } from "../../config/";

function HomeComponent() {
  const dispatch = useDispatch();
  // const choiceRef = useRef(null);
  // const [choice, setChoice] = useState("date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [date, setDate] = useState("");
  const [isDateRange, setIsDateRange] = useState(false);
  // redding the borders of fields if there is a missing field
  const [redSystem, setRedSystem] = useState(false);
  const [redSubject, setRedSubject] = useState(false);
  const [redBoard, setRedBoard] = useState(false);
  const [redStartDate, setRedStartDate] = useState(false);
  const [redEndDate, setRedEndDate] = useState(false);
  const [boards, setBoards] = useState([]);
  const [paper, setPaper] = useState({
    subject: "",
    system: "",
    board: "",
    date: "",
    from_date: "",
    to_date: "",
  });
  // useEffect(() => {
  //   if (isDateRange) {
  //     choiceRef.current = "daterange";
  //   } else {
  //     choiceRef.current = "date";
  //   }
  // }, [isDateRange]);
  useEffect(() => {
    if (S3_USERNAME) {
      console.log("S3 username is: ", S3_USERNAME);
    }
    console.log("S3 username is: ", S3_USERNAME);
  }, []);
  const change_input = (e) => {
    if (e[0] !== undefined) {
      if (e[0].text === "subject") {
        setRedSubject(false);
      }
      if (e[0].text === "board") {
        setRedBoard(false);
      }
      if (e[0].text === "system") {
        setRedSystem(false);
        setBoards([{ key: 0, value: "", text: "", label: "" }]);
        if (e[0].value === "GCSE") {
          setBoards([{ key: 0, value: "", text: "", label: "" }]);
          setBoards([
            { key: 0, value: "Edexcel", text: "board", label: "Edexcel" },
            { key: 1, value: "AQA", text: "board", label: "AQA" },
            { key: 2, value: "OCR", text: "board", label: "OCR" },
            { key: 3, value: "CCEA", text: "board", label: "CCEA" },
          ]);
        } else if (e[0].value === "IGCSE") {
          setBoards([{ key: 0, value: "", text: "", label: "" }]);
          setBoards([
            { key: 0, value: "Edexcel", text: "board", label: "Edexcel" },
            { key: 7, value: "CIE", text: "board", label: "CIE" },
          ]);
        } else if (e[0].value === "AS" || e[0].value === "A Level") {
          setBoards([{ key: 0, value: "", text: "", label: "" }]);
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
          setBoards([{ key: 0, value: "", text: "", label: "" }]);
          setBoards([{ key: 7, value: "CIE", text: "board", label: "CIE" }]);
        } else if (e[0].value === "IB") {
          setBoards([{ key: 0, value: "", text: "", label: "" }]);
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
    }
  };

  const change_start_month_and_year = (e) => {
    e.preventDefault();
    setRedStartDate(false);
    const newDate = normalizeDate(e.target.value);
    setStartDate(newDate);
    setPaper({ ...paper, from_date: newDate });
  };
  const change_end_month_and_year = (e) => {
    e.preventDefault();
    setRedEndDate(false);
    const newDate = normalizeDate(e.target.value);
    setEndDate(newDate);
    setPaper({ ...paper, to_date: newDate });
  };
  const change_month_and_year = (e) => {
    e.preventDefault();
    setRedStartDate(false);
    const newDate = normalizeDate(e.target.value);
    setDate(newDate);
    setPaper({ ...paper, date: newDate });
  };
  const onSubmit = (e) => {
    //validate every field here
    if (isDateRange) {
      if (
        paper.subject &&
        paper.system &&
        paper.board &&
        paper.to_date &&
        (paper.from_date || paper.date)
      ) {
        if (!paper.from_date) {
          paper.from_date = paper.date;
        }
        // console.log("came range");
        // setChoice("daterange");
        paper["choice"] = isDateRange ? "daterange" : "date";
        dispatch(getSearchPapers(paper));
        delete paper["choice"];
      } else {
        e.preventDefault();
        if (!paper.subject) {
          setRedSubject(true);
        }
        if (!paper.system) {
          setRedSystem(true);
        }
        if (!paper.board) {
          setRedBoard(true);
        }
        if (!paper.to_date) {
          setRedEndDate(true);
        }
        if (!paper.from_date && !paper.date) {
          setRedStartDate(true);
        }
        toast.error("Please fill in all the missing fields.");
      }
    } else {
      if (
        paper.subject &&
        paper.system &&
        paper.board &&
        (paper.date || paper.from_date)
      ) {
        if (!paper.date) {
          paper.date = paper.from_date;
        }
        // setChoice("date");
        // console.log("came date");

        paper["choice"] = isDateRange ? "daterange" : "date";
        dispatch(getSearchPapers(paper));
        delete paper["choice"];
      } else {
        e.preventDefault();
        if (!paper.subject) {
          setRedSubject(true);
        }
        if (!paper.system) {
          setRedSystem(true);
        }
        if (!paper.board) {
          setRedBoard(true);
        }
        if (!paper.from_date && !paper.date) {
          setRedStartDate(true);
        }
        toast.error("Please fill in all the required fields.");
      }
    }
  };

  return (
    <div className="content-width">
      <div className={styles.homeContent}>
        <ToastContainer />
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
              style={{ borderColor: redSystem ? "red" : "" }}
            />
            <Select
              className={styles.select}
              values={boards}
              options={boards}
              placeholder="Board"
              onChange={change_input}
              required
              style={{ borderColor: redBoard ? "red" : "" }}
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
              style={{ borderColor: redSubject ? "red" : "" }}
            />
          </div>

          <div className={`${styles.searchFields} ${styles.mobileResponsive}`}>
            <div
              className={`${styles.searchContainer} ${styles.dateResponsive} ${styles.dateMargin}`}
            >
              <div className={styles.radioHead}>
                <div className={styles.radioBtn}>
                  <label className={styles.radioButton}>
                    Date{" "}
                    {isDateRange && (
                      <span className={styles.appear}>(Start Date)</span>
                    )}
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
                  min="2000-01-01"
                  max="2040-12-28"
                  style={{ borderColor: redStartDate ? "red" : "" }}
                />
              </div>
            </div>

            <div
              className={`${styles.dateResponsive} ${styles.searchContainer}`}
            >
              <div className={styles.radioHead}>
                <div className={styles.radioBtn}>
                  <label className={styles.radioButton}>
                    Date Range{" "}
                    {isDateRange && (
                      <span className={styles.appear}>(End Date)</span>
                    )}
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
                    className={`${styles.inputDate} ${styles.appear}`}
                    type="date"
                    name="endDate"
                    id="endDate"
                    required
                    onChange={change_end_month_and_year}
                    min="2000-01-01"
                    max="2040-12-28"
                    style={{ borderColor: redEndDate ? "red" : "" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.searchButton}>
          <div onClick={onSubmit} className={styles.loginBtn}>
            <Link
              as="/search"
              href={`${
                isDateRange
                  ? `/search?subject=${paper.subject}&system=${paper.system}&board=${paper.board}&from_date=${paper.from_date}&to_date=${paper.to_date}`
                  : `/search?subject=${paper.subject}&system=${paper.system}&board=${paper.board}&date=${paper.date}`
              }`}
            >
              <a className="btn-style sign">Search</a>
            </Link>

            {/* <button className="btn-style sign">Search</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
