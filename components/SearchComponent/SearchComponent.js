import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-dropdown-select";
import styles from "./SearchComponent.module.css";
import { SearchedPaperCard } from "../SearchedPaperCard";
import { useSelector } from "react-redux";
import { subjects, systems } from "@lib/papersData";
import { normalizeDate } from "@lib/normalizeDate";
import { useDispatch } from "react-redux";
import { getSearchPapers } from "../../services/searchSlice";
import Loader from "@components/common/Loader";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

function SearchComponent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [date, setDate] = useState(normalizeDate(new Date()));
  const [startDate, setStartDate] = useState(normalizeDate(new Date()));
  const [endDate, setEndDate] = useState(normalizeDate(new Date()));
  const [isDateRange, setIsDateRange] = useState(false);
  // redding the borders of fields if there is a missing field
  const [redSystem, setRedSystem] = useState(false);
  const [redSubject, setRedSubject] = useState(false);
  const [redBoard, setRedBoard] = useState(false);
  const [redStartDate, setRedStartDate] = useState(false);
  const [redEndDate, setRedEndDate] = useState(false);
  const [boards, setBoards] = useState([]);
  const [updateUrl, setUpdateUrl] = useState(false);
  const [paper, setPaper] = useState({
    subject: "",
    system: "",
    board: "",
    date: date,
    from_date: startDate,
    to_date: endDate,
  });
  // useEffect(() => {
  //   console.log("data:", router.query, "router: ", router);
  //   let paper = router.query;

  //   dispatch(getSearchPapers(paper));
  // }, []);
  useEffect(() => {
    if (updateUrl) {
      router.push(
        `${
          isDateRange
            ? `/search?subject=${paper.subject}&system=${paper.system}&board=${paper.board}&from_date=${paper.from_date}&to_date=${paper.to_date}`
            : `/search?subject=${paper.subject}&system=${paper.system}&board=${paper.board}&date=${paper.date}`
        }`,
        undefined,
        {
          shallow: true,
        }
      );
    }
    setUpdateUrl(false);
  }, [updateUrl]);
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
  const { data, pending, error } = useSelector((state) => state.papers);

  const change_start_month_and_year = (date) => {
    setRedStartDate(false);
    const newDate = normalizeDate(date);
    setStartDate(newDate);
    setPaper({ ...paper, from_date: newDate });
  };
  const change_end_month_and_year = (date) => {
    setRedEndDate(false);
    const newDate = normalizeDate(date);
    setEndDate(newDate);
    setPaper({ ...paper, to_date: newDate });
  };
  const change_month_and_year = (date) => {
    setRedStartDate(false);
    const newDate = normalizeDate(date);
    setDate(newDate);
    setPaper({ ...paper, date: newDate });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setUpdateUrl(true);
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
        paper["choice"] = isDateRange ? "daterange" : "date";
        dispatch(getSearchPapers(paper));
        delete paper["choice"];
      } else {
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
        toast.error("Please fill in all the required fields.");
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
        paper["choice"] = isDateRange ? "daterange" : "date";
        dispatch(getSearchPapers(paper));
        delete paper["choice"];
      } else {
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
                style={{ border: redSystem ? "1px solid red" : "none" }}
              />
              <Select
                className={styles.select}
                values={boards}
                options={boards}
                placeholder="Board"
                onChange={change_input}
                required
                style={{ border: redBoard ? "1px solid red" : "none" }}
              />

              <Select
                className={styles.select}
                options={subjects}
                placeholder="Subject"
                onChange={change_input}
                required
                style={{ border: redSubject ? "1px solid red" : "none" }}
              />
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
                        Date{" "}
                        {isDateRange && (
                          <span className={styles.appear}>(Start Date)</span>
                        )}
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
                    <DatePicker
                      className={styles.inputDate}
                      selected={isDateRange ? startDate : date}
                      style={{
                        border: redStartDate ? "1px solid red" : "none",
                      }}
                      showMonthYearPicker
                      peekNextMonth
                      onChangeRaw={(e) => e.preventDefault()}
                      onFocus={(e) => e.preventDefault()}
                      onKeyDown={(e) => e.preventDefault()}
                      disabledKeyboardNavigation
                      dateFormat="MMMM yyyy"
                      onChange={
                        isDateRange
                          ? change_start_month_and_year
                          : change_month_and_year
                      }
                    />
                    {/* <input
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
                      style={{
                        border: redStartDate ? "1px solid red" : "none",
                      }}
                    /> */}
                  </div>
                </div>

                <div className={`${styles.dateResponsive} ${styles.last}`}>
                  <div className={`${styles.radioHead}`}>
                    <div className={styles.radioBtn}>
                      <label className={styles.radioButton}>
                        Date Range{" "}
                        {isDateRange && (
                          <span className={styles.appear}>(End Date)</span>
                        )}
                        <input
                          type="radio"
                          name="radio"
                          className={`${styles.radioHead}`}
                          value="daterange"
                          checked={isDateRange === true}
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
                      <DatePicker
                        className={`${styles.inputDate} ${styles.appear}`}
                        selected={endDate}
                        style={{
                          border: redEndDate ? "1px solid red" : "none",
                        }}
                        showMonthYearPicker
                        peekNextMonth
                        onChangeRaw={(e) => e.preventDefault()}
                        onFocus={(e) => e.preventDefault()}
                        onKeyDown={(e) => e.preventDefault()}
                        disabledKeyboardNavigation
                        dateFormat="MMMM yyyy"
                        onChange={change_end_month_and_year}
                      />
                      // <input
                      //   className={`${styles.inputDate} ${styles.appear}`}
                      //   type="date"
                      //   name="endDate"
                      //   id="endDate"
                      //   required
                      //   onChange={change_end_month_and_year}
                      //   min="2000-01-01"
                      //   max="2040-12-28"
                      //   style={{
                      //     border: redEndDate ? "1px solid red" : "none",
                      //   }}
                      // />
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
      <div className="content-width">
        <div style={{ paddingBottom: "30px" }}>
          {router.query.subject && data && data[0]?.id && !pending && !error ? (
            <>
              Showing results for:{" "}
              <b>
                {router.query.system}, {router.query.board},{" "}
                {router.query.subject},{" "}
                {router.query.date && (
                  <>
                    {router.query.date.substr(4, 3)}/ {/*Month*/}
                    {router.query.date.substr(11, 4)} {/*Year*/}
                  </>
                )}
                {router.query.from_date && (
                  <>
                    {router.query.from_date.substr(4, 3)}/{" "}
                    {router.query.from_date.substr(11, 4)} -{" "}
                    {router.query.to_date.substr(4, 3)}/{" "}
                    {router.query.to_date.substr(11, 4)}
                  </>
                )}{" "}
              </b>
            </>
          ) : (
            ""
          )}
        </div>
        {/* Grid */}
        {/*check if data, pending, and error all are false */}
        {data?.message ? (
          <div style={{ margin: "0px 0px 30px 0px", height: "50vh" }}>
            There was some error while fetching the data. We will take notice of
            the problem and fix at our earliest.
          </div>
        ) : data && !data[0]?.id && !pending && !error ? (
          <div style={{ margin: "0px 0px 30px 0px", height: "50vh" }}>
            Perform a search.
          </div>
        ) : (
          <>
            {pending ? (
              <Loader fontSize="15px" margin="0rem 0rem 30rem 0rem" />
            ) : data === null ? (
              <div style={{ margin: "0px 0px 30px 30px", height: "50vh" }}>
                We didn&apos;t find any papers matching your criteria.
              </div>
            ) : data && data[0].id ? (
              // <div className="content-width">
              <>
                <div className={styles.mainBox}>
                  <div className={`${styles.gridLogoss} ${styles.logos}`}>
                    {/* mapping through the data */}
                    {data?.map((paper, i) => {
                      return <SearchedPaperCard paper={paper} key={i} />;
                    })}
                  </div>
                  <div
                    className={`${styles.searchButton} ${styles.buttonMargin}`}
                  >
                    <div className={styles.loginBtn}>
                      {/* <button className="btn-style sign">Read More</button> */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ margin: "0px 0px 30px 0px", height: "50vh" }}>
                There was some error while fetching the data. We will take
                notice of the problem and fix at our earliest.
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default SearchComponent;
