import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import styles from "./SearchComponent.module.css";
import { SearchedPaperCard } from "../SearchedPaperCard";
import { useSelector } from "react-redux";
import { subjects, systems } from "@lib/papersData";
import { normalizeDate } from "@lib/normalizeDate";
import { useDispatch } from "react-redux";
import { getSearchPapers } from "./searchSlice";
import Loader from "@components/common/Loader";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

function SearchComponent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [date, setDate] = useState(normalizeDate(new Date()));
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
    from_date: date,
    to_date: endDate,
  });

  const { data, pending, error } = useSelector((state) => state.papers);
  // Filters
  const [referenceFilter, setReferenceFilter] = useState("");
  const [blueFilter, setBlueFilter] = useState(false);
  const [yellowFilter, setYellowFilter] = useState(false);
  const [greenFilter, setGreenFilter] = useState(false);
  // const [test, setTest] = useState(1);
  // const [filteredData, setFilteredData] = useState([]);
  // let filterReference = (paper) => {
  //   if (referenceFilter === "") return paper; // if commented, all papers gone when a filter is slected
  //   return paper.reference
  //     .toLocaleLowerCase()
  //     .includes(referenceFilter?.toLocaleLowerCase());
  // };
  let filteredData =
    data &&
    data[0].id &&
    data?.filter((paper) => {
      let dataToFilter = paper;
      if (referenceFilter && greenFilter && yellowFilter && blueFilter) {
        return (
          dataToFilter &&
          dataToFilter.reference
            .toLocaleLowerCase()
            .includes(referenceFilter?.toLocaleLowerCase())
        );
      }
      if (referenceFilter && greenFilter && yellowFilter && !blueFilter) {
        return (
          dataToFilter &&
          dataToFilter.reference
            .toLocaleLowerCase()
            .includes(referenceFilter?.toLocaleLowerCase()) &&
          dataToFilter.is_theory
        );
      }
      if (referenceFilter && greenFilter && blueFilter && !yellowFilter) {
        return (
          dataToFilter &&
          dataToFilter.reference
            .toLocaleLowerCase()
            .includes(referenceFilter?.toLocaleLowerCase()) &&
          !dataToFilter.is_theory
        );
      }
      if (referenceFilter && yellowFilter && blueFilter && !greenFilter) {
        return (
          dataToFilter &&
          dataToFilter.reference
            .toLocaleLowerCase()
            .includes(referenceFilter?.toLocaleLowerCase()) &&
          dataToFilter?.notes !== "Practical"
        );
      }
      if (greenFilter && yellowFilter && blueFilter && !referenceFilter) {
        return dataToFilter;
      }
      if (referenceFilter && greenFilter && !yellowFilter && !blueFilter) {
        return (
          dataToFilter &&
          dataToFilter.reference
            .toLocaleLowerCase()
            .includes(referenceFilter?.toLocaleLowerCase()) &&
          dataToFilter?.notes === "Practical"
        );
      }
      if (referenceFilter && yellowFilter && !greenFilter && !blueFilter) {
        return (
          dataToFilter &&
          dataToFilter.reference
            .toLocaleLowerCase()
            .includes(referenceFilter?.toLocaleLowerCase()) &&
          dataToFilter?.notes !== "Practical" &&
          dataToFilter.is_theory
        );
      }
      if (referenceFilter && blueFilter && !greenFilter && !yellowFilter) {
        return (
          dataToFilter &&
          dataToFilter.reference
            .toLocaleLowerCase()
            .includes(referenceFilter?.toLocaleLowerCase()) &&
          dataToFilter?.notes !== "Practical" &&
          !dataToFilter.is_theory
        );
      }
      if (greenFilter && yellowFilter && !referenceFilter && !blueFilter) {
        return (
          dataToFilter &&
          (dataToFilter?.notes === "Practical" || dataToFilter.is_theory)
        );
      }
      if (greenFilter && blueFilter && !referenceFilter && !yellowFilter) {
        return dataToFilter && !dataToFilter.is_theory;
      }
      if (yellowFilter && blueFilter && !referenceFilter && !greenFilter) {
        return dataToFilter && dataToFilter?.notes !== "Practical";
      }

      if (referenceFilter && !greenFilter && !yellowFilter && !blueFilter) {
        return dataToFilter.reference
          .toLocaleLowerCase()
          .includes(referenceFilter?.toLocaleLowerCase());
      }
      if (greenFilter && !referenceFilter && !yellowFilter && !blueFilter) {
        console.log("green");
        console.log(dataToFilter);
        return dataToFilter && dataToFilter.notes === "Practical";
      }
      if (yellowFilter && !referenceFilter && !greenFilter && !blueFilter) {
        console.log("yellow");
        return (
          dataToFilter &&
          dataToFilter.is_theory &&
          (dataToFilter.notes === "" ||
            dataToFilter.notes === null ||
            dataToFilter.notes === undefined)
        );
      }
      if (blueFilter && !referenceFilter && !greenFilter && !yellowFilter) {
        console.log("blue");
        return (
          dataToFilter &&
          !dataToFilter.is_theory &&
          dataToFilter.notes !== "Practical"
        );
      }
      return dataToFilter;
    });
  useEffect(() => {
    // extracting the url and sending the data to the server
    try {
      let url = window.location.href;
      let paper1 = url.substring(url.indexOf("?") + 1);
      paper1 = decodeURIComponent(paper1);
      let paper3 = paper1.split("&");
      let paper4 = paper3.map((item) => {
        let paper5 = item.split("=");
        return paper5;
      });
      let paper6 = paper4.map((item) => {
        let paper7 = {};
        paper7[item[0]] = item[1];
        return paper7;
      });
      let paper8 = paper6.reduce((acc, curr) => {
        return { ...acc, ...curr };
      });
      // correcting the date format
      if (paper8.choice === "date") {
        setIsDateRange(false);
        let dateString = paper8["date"].slice(3, 24);
        let newDate = new Date(`${dateString}`);
        paper8["date"] = newDate;
        setDate(newDate);
        let normalTodayDate = normalizeDate(new Date());
        setEndDate(normalTodayDate);
      } else {
        setIsDateRange(true);
        let fromDateString = paper8["from_date"].slice(3, 24);
        let toDateString = paper8["to_date"].slice(3, 24);
        let newFromDate = new Date(`${fromDateString}`);
        let newToDate = new Date(`${toDateString}`);
        paper8["from_date"] = newFromDate;
        paper8["to_date"] = newToDate;
        setDate(newFromDate);
        setEndDate(newToDate);
      }
      setPaper(paper8);
      delete paper.choice;
      // updated paper.board as is the board value in paper8
      if (paper8.system === "GCSE") {
        setBoards([{ key: 0, value: "", text: "", label: "" }]);
        setBoards([
          { key: 0, value: "Edexcel", text: "board", label: "Edexcel" },
          { key: 1, value: "AQA", text: "board", label: "AQA" },
          { key: 2, value: "OCR", text: "board", label: "OCR" },
          { key: 3, value: "CCEA", text: "board", label: "CCEA" },
        ]);
      } else if (paper8.system === "IGCSE") {
        setBoards([{ key: 0, value: "", text: "", label: "" }]);
        setBoards([
          { key: 0, value: "Edexcel", text: "board", label: "Edexcel" },
          { key: 7, value: "CIE", text: "board", label: "CIE" },
        ]);
      } else if (paper8.system === "AS" || paper8.system === "A Level") {
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
      } else if (paper8.system === "O Level" || paper8.system === "Pre U") {
        setBoards([{ key: 0, value: "", text: "", label: "" }]);
        setBoards([{ key: 7, value: "CIE", text: "board", label: "CIE" }]);
      } else if (paper8.system === "IB") {
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
      dispatch(getSearchPapers(paper8));
    } catch (error) {
      console.log(error);
    }
  }, []);
  // useEffect(() => {
  //   console.log("data got trigger");
  //   if (data) {
  //     console.log("inside data");
  //     setFilteredData(data);
  //   }
  // }, [data]);

  useEffect(() => {
    if (updateUrl) {
      router.push(
        `${
          isDateRange
            ? `/search?subject=${paper.subject}&system=${paper.system}&board=${paper.board}&from_date=${paper.from_date}&to_date=${paper.to_date}&choice=daterange`
            : `/search?subject=${paper.subject}&system=${paper.system}&board=${paper.board}&date=${paper.date}&choice=date`
        }`,
        undefined,
        {
          shallow: true,
        }
      );
    }
    setUpdateUrl(false);
  }, [updateUrl]);

  useEffect(() => {
    // setTest(() => 7);
    // console.log(test);
    // if (data.length > 0) {
    //   console.log("yo: ", filteredData);
    //   setFilteredData(() => {
    //     return (
    //       data[0]?.id &&
    //       data?.filter((paper) =>
    //         paper?.reference?.toLowerCase()?.includes(
    //           referenceFilter?.toLocaleLowerCase()
    // && blueFilter === false
    //   ? paper.is_theory === undefined
    //   : yellowFilter === false
    //   ? paper.is_theory === true
    //   : ""
    //         )
    //       )
    //     );
    //   });
    // }

    return () => {
      setReferenceFilter("");
    };
  }, []);

  const change_input = (e) => {
    if (e !== undefined) {
      if (e.text === "subject") {
        setRedSubject(false);
      }
      if (e.text === "board") {
        setRedBoard(false);
      }
      if (e.text === "system") {
        setRedSystem(false);
        setBoards([{ key: 0, value: "", text: "", label: "" }]);
        setPaper({ ...paper, board: "" });
        if (e.value === "GCSE") {
          setBoards([{ key: 0, value: "", text: "", label: "" }]);
          setBoards([
            { key: 0, value: "Edexcel", text: "board", label: "Edexcel" },
            { key: 1, value: "AQA", text: "board", label: "AQA" },
            { key: 2, value: "OCR", text: "board", label: "OCR" },
            { key: 3, value: "CCEA", text: "board", label: "CCEA" },
          ]);
        } else if (e.value === "IGCSE") {
          setBoards([{ key: 0, value: "", text: "", label: "" }]);
          setBoards([
            { key: 0, value: "Edexcel", text: "board", label: "Edexcel" },
            { key: 7, value: "CIE", text: "board", label: "CIE" },
          ]);
        } else if (e.value === "AS" || e.value === "A Level") {
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
        } else if (e.value === "O Level" || e.value === "Pre U") {
          setBoards([{ key: 0, value: "", text: "", label: "" }]);
          setBoards([{ key: 7, value: "CIE", text: "board", label: "CIE" }]);
        } else if (e.value === "IB") {
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
      setPaper({ ...paper, [e.text]: e.value });
    }
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
    setPaper({ ...paper, from_date: newDate });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    change_end_month_and_year(endDate);
    change_month_and_year(date);
    paper.to_date = normalizeDate(endDate);
    setUpdateUrl(true);
    if (isDateRange) {
      if (paper.subject && paper.system && paper.board) {
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
        toast.error("Please fill in all the required fields.");
      }
    } else {
      if (paper.subject && paper.system && paper.board) {
        paper.date = paper.from_date;
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
                className={
                  redSystem
                    ? `${styles.selectRed} ${styles.select}`
                    : `${styles.select}`
                }
                maxMenuHeight="80"
                options={systems}
                placeholder="System"
                value={
                  systems.filter((item) => item.value === paper.system)[0] || ""
                }
                instanceId="system"
                onChange={change_input}
                required
              />
              <Select
                className={
                  redBoard
                    ? `${styles.selectRed} ${styles.select}`
                    : `${styles.select}`
                }
                value={
                  boards.filter((item) => item.value === paper.board)[0] || ""
                }
                options={boards}
                placeholder="Board"
                instanceId="board"
                onChange={change_input}
                required
              />

              <Select
                className={
                  redSubject
                    ? `${styles.selectRed} ${styles.select}`
                    : `${styles.select}`
                }
                options={subjects}
                instanceId="subject"
                value={
                  subjects.filter((item) => item.value === paper.subject)[0] ||
                  ""
                }
                placeholder="Subject"
                onChange={change_input}
                required
                style={{
                  border: redSubject ? "1px solid red" : "none",
                }}
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
                      selected={date}
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
                      onChange={change_month_and_year}
                    />
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
                    )}
                  </div>
                </div>
                <div className={styles.searchButton}>
                  <div className={styles.loginBtn}>
                    <button
                      onClick={(e) => {
                        paper.to_date = normalizeDate(endDate);
                        paper.date = normalizeDate(date);
                        paper.from_date = normalizeDate(date);
                        onSubmit(e);
                      }}
                      className="btn-style sign"
                    >
                      Search
                    </button>
                  </div>
                </div>
                {/* <div className={styles.searchBox}>
                  <div
                    className={`${styles.searchFields} ${styles.mobileResponsive}`}
                  >
                    <input
                      type="text"
                      id="reference"
                      name="reference"
                      placeholder="Filter with reference"
                      onChange={(e) => setReferenceFilter(e.target.value)}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-width">
        <div className={styles.identityContainer}>
          <div className={styles.abc}>
            <div>
              <p className={styles.identity}>Filter with Legends</p>
              <div className={styles.colors}>
                <div
                  className={styles.colorContainer}
                  onClick={() => setBlueFilter(!blueFilter)}
                >
                  <div
                    style={{
                      backgroundColor: "#0000ff",
                    }}
                    className={styles.color}
                  ></div>
                  <p
                    style={{
                      color: blueFilter ? "black" : "#92929e",
                    }}
                    className={styles.mcqs}
                  >
                    MCQs
                  </p>
                </div>
                <div
                  className={styles.colorContainer}
                  onClick={() => setYellowFilter(!yellowFilter)}
                >
                  <div
                    style={{
                      backgroundColor: "#ffff00",
                    }}
                    className={styles.color}
                  ></div>
                  <p
                    style={{
                      color: yellowFilter ? "black" : "#92929e",
                    }}
                    className={styles.mcqs}
                  >
                    Theory
                  </p>
                </div>
                <div
                  className={styles.colorContainer}
                  onClick={() => setGreenFilter(!greenFilter)}
                >
                  <div
                    style={{
                      backgroundColor: "#00ff00",
                    }}
                    className={styles.color}
                  ></div>
                  <p
                    style={{
                      color: greenFilter ? "black" : "#92929e",
                    }}
                    className={styles.mcqs}
                  >
                    Practical
                  </p>
                </div>
              </div>
            </div>

            <div
            // className={`${styles.searchFields} ${styles.mobileResponsive}`}
            >
              <div className={styles.field}>
                <input
                  type="text"
                  className={styles.inputDate}
                  id="reference"
                  name="reference"
                  placeholder="Filter with reference"
                  onChange={(e) => setReferenceFilter(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => {
                setBlueFilter(false);
                setYellowFilter(false);
                setGreenFilter(false);
              }}
              className="btn-style-secondary"
              style={{ height: "38px", padding: "10px 20px" }}
            >
              Reset Filters
            </button>
          </div>
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
                <div className={styles.mainBox} style={{ minHeight: "50vh" }}>
                  <div className={`${styles.gridLogoss} ${styles.logos}`}>
                    {/* mapping through the data */}
                    {filteredData &&
                      filteredData?.map((paper, i) => {
                        return <SearchedPaperCard paper={paper} key={i} />;
                      })}
                  </div>
                  {/* <div
                    className={`${styles.searchButton} ${styles.buttonMargin}`}
                  >
                    <div className={styles.loginBtn}>
                      <button className="btn-style sign">Read More</button>
                    </div>
                  </div> */}
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
