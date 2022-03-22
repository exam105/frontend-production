import { useState, useEffect } from "react";
import Select from "react-select";
import { API } from "@config/index";
import styles from "./HomeComponent.module.css";
import { normalizeDate } from "@lib/normalizeDate";
import { subjects, systems } from "@lib/papersData";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import Image from "next/image";

function HomeComponent() {
  const [chemistryLength, setChemistryLength] = useState(0);
  const [mathsLength, setMathsLength] = useState(0);
  const [biologyLength, setBiologyLength] = useState(0);
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
  const [paper, setPaper] = useState({
    subject: "",
    system: "",
    board: "",
    date: date,
    from_date: date,
    to_date: endDate,
  });
  useEffect(() => {
    const fetchBiologyLength = async () => {
      const res = await fetch(`${API}/dashboard/de/search/daterange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Biology",
          system: "IGCSE",
          board: "Edexcel",
          from_date: "2011-01-01T00:00:00.000Z",
          to_date: "2019-12-01T00:00:00.000Z",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setBiologyLength(data?.length);
      }
    };
    const fetchMathLength = async () => {
      const res = await fetch(`${API}/dashboard/de/search/daterange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Math",
          system: "IGCSE",
          board: "Edexcel",
          from_date: "2011-01-01T00:00:00.000Z",
          to_date: "2019-12-01T00:00:00.000Z",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setMathsLength(data?.length);
      }
    };
    const fetchChemistryLength = async () => {
      const res = await fetch(`${API}/dashboard/de/search/daterange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Chemistry",
          system: "IGCSE",
          board: "Edexcel",
          from_date: "2011-01-01T00:00:00.000Z",
          to_date: "2019-12-01T00:00:00.000Z",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setChemistryLength(data?.length);
      }
    };
    fetchBiologyLength();
    fetchMathLength();
    fetchChemistryLength();
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
        router.push(
          `/search?subject=${paper.subject}&system=${paper.system}&board=${paper.board}&from_date=${paper.from_date}&to_date=${paper.to_date}&choice=daterange`
        );
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
        toast.error("Please fill in all the missing fields.");
      }
    } else {
      if (
        paper.subject &&
        paper.system &&
        paper.board &&
        (paper.date || paper.from_date)
      ) {
        paper.date = paper.from_date;
        router.push(
          `/search?subject=${paper.subject}&system=${paper.system}&board=${paper.board}&date=${paper.date}&choice=date`
        );
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
    <div className="content-width">
      <div className={styles.homeContent}>
        <ToastContainer />
        <h1 className={styles.heading}>
          Welcome to
          <span className={styles.textGreen}> EXAM105 Platform.</span> Right now
          we have{" "}
          <span
            className={`${styles.subjectLength}`}
            onClick={() => {
              router.push(
                `/search?subject=Math&system=IGCSE&board=Edexcel&from_date=Sat Jan 01 2011 05:30:00 GMT+0530 (India Standard Time)&to_date=Sun Dec 01 2019 05:30:00 GMT+0530 (India Standard Time)&choice=daterange`
              );
            }}
          >
            {mathsLength > 0 && mathsLength}
          </span>
          {chemistryLength > 0 && (
            <>
              {", "}
              <span
                className={`${styles.subjectLength}`}
                onClick={() => {
                  router.push(
                    `/search?subject=Chemistry&system=IGCSE&board=Edexcel&from_date=Sat Jan 01 2011 05:30:00 GMT+0530 (India Standard Time)&to_date=Sun Dec 01 2019 05:30:00 GMT+0530 (India Standard Time)&choice=daterange`
                  );
                }}
              >
                {chemistryLength}
              </span>
            </>
          )}{" "}
          {biologyLength > 0 && (
            <>
              {"and "}
              <span
                className={`${styles.subjectLength}`}
                onClick={() => {
                  router.push(
                    `/search?subject=Biology&system=IGCSE&board=Edexcel&from_date=Sat Jan 01 2011 05:30:00 GMT+0530 (India Standard Time)&to_date=Sun Dec 01 2019 05:30:00 GMT+0530 (India Standard Time)&choice=daterange`
                  );
                }}
              >
                {biologyLength}
              </span>
            </>
          )}{" "}
          papers of IGCSE Edexcel from{" "}
          <span className={styles.importantPart}>
            2011 to 2019 for Maths, Chemistry, and Biology subjects respectively
          </span>
          .
          {/* Here you
          can Explore and Download Cambridge board past papers. You can even
          download your customized eBook composed of different questions from
          different papers. */}
        </h1>

        {/* <div className={styles.innerContainer}>
          <div className={styles.innerRightContainer}>
            <div className={styles.newInnerRightContent}>
              <div className={styles.newSystemText}>
                <p className={styles.systemRight}>IGCSE</p>
                <p className={styles.boardText}> Edexcel</p>
              </div>
              <div className={styles.cardsMain}>
                <div className={styles.systems}>
                  <div className={styles.years}>
                    <p className={styles.newSubject}>Computer Science</p>
                  </div>
                </div>

                <div className={styles.systems}>
                  <div className={styles.years}>
                    <div className={styles.systemsYear}>
                      <p className={styles.newCardsSubject}>Date:</p>
                      <div className={styles.newDates}>
                        <p className={styles.newCardsDate}>Jan / 2012</p>
                        <p className={styles.dash}>-</p>
                        <p className={styles.newCardsDate}>Dec / 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.innerRightContainer}>
            <div className={styles.newInnerRightContent}>
              <div className={styles.newSystemText}>
                <p className={styles.systemRight}>IGCSE</p>
                <p className={styles.boardText}> Edexcel</p>
              </div>
              <div className={styles.cardsMain}>
                <div className={styles.systems}>
                  <div className={styles.years}>
                    <p className={styles.newSubject}>Computer Science</p>
                  </div>
                </div>

                <div className={styles.systems}>
                  <div className={styles.years}>
                    <div className={styles.systemsYear}>
                      <p className={styles.newCardsSubject}>Date:</p>
                      <div className={styles.newDates}>
                        <p className={styles.newCardsDate}>Jan / 2012</p>
                        <p className={styles.dash}>-</p>
                        <p className={styles.newCardsDate}>Dec / 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.innerRightContainer}>
            <div className={styles.newInnerRightContent}>
              <div className={styles.newSystemText}>
                <p className={styles.systemRight}>IGCSE</p>
                <p className={styles.boardText}> Edexcel</p>
              </div>
              <div className={styles.cardsMain}>
                <div className={styles.systems}>
                  <div className={styles.years}>
                    <p className={styles.newSubject}>Computer Science</p>
                  </div>
                </div>

                <div className={styles.systems}>
                  <div className={styles.years}>
                    <div className={styles.systemsYear}>
                      <p className={styles.newCardsSubject}>Date:</p>
                      <div className={styles.newDates}>
                        <p className={styles.newCardsDate}>Jan / 2012</p>
                        <p className={styles.dash}>-</p>
                        <p className={styles.newCardsDate}>Dec / 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.innerRightContainer}>
            <div className={styles.newInnerRightContent}>
              <div className={styles.newSystemText}>
                <p className={styles.systemRight}>IGCSE</p>
                <p className={styles.boardText}> Edexcel</p>
              </div>
              <div className={styles.cardsMain}>
                <div className={styles.systems}>
                  <div className={styles.years}>
                    <p className={styles.newSubject}>Computer Science</p>
                  </div>
                </div>

                <div className={styles.systems}>
                  <div className={styles.years}>
                    <div className={styles.systemsYear}>
                      <p className={styles.newCardsSubject}>Date:</p>
                      <div className={styles.newDates}>
                        <p className={styles.newCardsDate}>Jan / 2012</p>
                        <p className={styles.dash}>-</p>
                        <p className={styles.newCardsDate}>Dec / 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.innerRightContainer}>
            <div className={styles.newInnerRightContent}>
              <div className={styles.newSystemText}>
                <p className={styles.systemRight}>IGCSE</p>
                <p className={styles.boardText}> Edexcel</p>
              </div>
              <div className={styles.cardsMain}>
                <div className={styles.systems}>
                  <div className={styles.years}>
                    <p className={styles.newSubject}>Computer Science</p>
                  </div>
                </div>

                <div className={styles.systems}>
                  <div className={styles.years}>
                    <div className={styles.systemsYear}>
                      <p className={styles.newCardsSubject}>Date:</p>
                      <div className={styles.newDates}>
                        <p className={styles.newCardsDate}>Jan / 2012</p>
                        <p className={styles.dash}>-</p>
                        <p className={styles.newCardsDate}>Dec / 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.innerRightContainer}>
            <div className={styles.newInnerRightContent}>
              <div className={styles.newSystemText}>
                <p className={styles.systemRight}>IGCSE</p>
                <p className={styles.boardText}> Edexcel</p>
              </div>
              <div className={styles.cardsMain}>
                <div className={styles.systems}>
                  <div className={styles.years}>
                    <p className={styles.newSubject}>Computer Science</p>
                  </div>
                </div>

                <div className={styles.systems}>
                  <div className={styles.years}>
                    <div className={styles.systemsYear}>
                      <p className={styles.newCardsSubject}>Date:</p>
                      <div className={styles.newDates}>
                        <p className={styles.newCardsDate}>Jan / 2012</p>
                        <p className={styles.dash}>-</p>
                        <p className={styles.newCardsDate}>Dec / 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.innerRightContainer}>
            <div className={styles.newInnerRightContent}>
              <div className={styles.newSystemText}>
                <p className={styles.systemRight}>IGCSE</p>
                <p className={styles.boardText}> Edexcel</p>
              </div>
              <div className={styles.cardsMain}>
                <div className={styles.systems}>
                  <div className={styles.years}>
                    <p className={styles.newSubject}>Computer Science</p>
                  </div>
                </div>

                <div className={styles.systems}>
                  <div className={styles.years}>
                    <div className={styles.systemsYear}>
                      <p className={styles.newCardsSubject}>Date:</p>
                      <div className={styles.newDates}>
                        <p className={styles.newCardsDate}>Jan / 2012</p>
                        <p className={styles.dash}>-</p>
                        <p className={styles.newCardsDate}>Dec / 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.innerRightContainer}>
            <div className={styles.newInnerRightContent}>
              <div className={styles.newSystemText}>
                <p className={styles.systemRight}>IGCSE</p>
                <p className={styles.boardText}> Edexcel</p>
              </div>
              <div className={styles.cardsMain}>
                <div className={styles.systems}>
                  <div className={styles.years}>
                    <p className={styles.newSubject}>Computer Science</p>
                  </div>
                </div>

                <div className={styles.systems}>
                  <div className={styles.years}>
                    <div className={styles.systemsYear}>
                      <p className={styles.newCardsSubject}>Date:</p>
                      <div className={styles.newDates}>
                        <p className={styles.newCardsDate}>Jan / 2012</p>
                        <p className={styles.dash}>-</p>
                        <p className={styles.newCardsDate}>Dec / 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className={styles.searchBox}>
          <div className={`${styles.searchFields} ${styles.mobileResponsive}`}>
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
          </div>

          <div
            className={`${styles.searchFields} ${styles.mobileResponsive} ${styles.mobile}`}
          >
            <Select
              className={
                redSubject
                  ? `${styles.selectRed} ${styles.select}`
                  : `${styles.select}`
              }
              options={subjects}
              instanceId="subject"
              value={
                subjects.filter((item) => item.value === paper.subject)[0] || ""
              }
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
                <DatePicker
                  className={styles.inputDate}
                  selected={date}
                  style={{ border: redStartDate ? "1px solid red" : "none" }}
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
                      checked={isDateRange === true}
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
                  <DatePicker
                    className={`${styles.inputDate} ${styles.appear}`}
                    selected={endDate}
                    style={{ border: redEndDate ? "1px solid red" : "none" }}
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
                  //   style={{ border: redEndDate ? "1px solid red" : "none" }}
                  // />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.searchButton}>
          <div onClick={onSubmit} className={styles.loginBtn}>
            <a className="btn-style sign">Search</a>
          </div>
        </div>
        {/* <div className={styles.quickLinks}>
          <span>Quick Links: </span>
          <div>
            <a className="btn-style-secondary">Edexcel Maths 2011 - 2019</a>{" "}
            <a className="btn-style-secondary">Edexcel Chemistry 2011 - 2019</a>
          </div>{" "}
        </div> */}
      </div>
    </div>
  );
}

export default HomeComponent;
