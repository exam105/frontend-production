import { useState, useEffect } from "react";
// import useSWR from "swr";
// import axios from "axios";
import styles from "@/styles/Search.module.css";

export default function Search() {
  const [term, setTerm] = useState("");
  const [questions, setQuestions] = useState([]);
  // const url = "http://dev.exam105.com:9090/dashboard/de/search/date";
  const user = {
    subject: "Math",
    system: "GCSE",
    board: "Edexcel",
    date: "2021-02-01T00:00:00.000Z",
  };
  const quesIds = {
    obj1: "6039cbd935313bd2e2cb4558",
    obj2: "603dd248daca4632861c27ab",
    obj3: "604cefb7daca4632861c2800",
    obj4: "604ceb88daca4632861c27fe",
    obj5: "604db63bdaca4632861c2807",
    obj6: "604db1dcdaca4632861c2805",
    obj7: "6043cec9daca4632861c27bf",
  };

  // const fetcher = (url) =>
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   }).then((res) => res.json());

  // function Profile() {

  // }
  // const { data, error } = useSWR(url, fetcher);

  const register = async (user) => {
    // const res = await fetch(
    //   "http://dev.exam105.com:9090/dashboard/de/search/date",
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(user),
    //   }
    // );
    // const data = await res.json();
    // console.log("data: ", data);
    // console.log("res: ", res);
    // console.log(JSON.stringify(user));
    // axios({
    //   method: "POST",
    //   url: "http://dev.exam105.com:9090/dashboard/de/search/date",
    //   data: user,
    // })
    //   .then((res) => {
    //     if (res.data === null) {
    //     } else {
    //       console.log(res.data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // for (const id in quesIds) {
    //   axios({
    //     method: "GET",
    //     url: `/dashboard/de/question/${quesIds[id]}`,
    //   })
    //     .then((res) => {
    //       if (res.data === null) {
    //       } else {
    //         setQuestions([...questions, res.data]);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    // console.log(questions);
    // axios({
    //   method: "GET",
    //   url: `http://dev.exam105.com:9090/dashboard/de/question/${quesIds.obj1}`,
    // })
    //   .then((res) => {
    //     if (res.data === null) {
    //     } else {
    //       console.log("mallll", res.data);
    //       // setQuestions(...res.data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log("the mall is this: ", questions);
    // if (res) {
    //   console.log(data);
    // } else {
    //   console.log("errorrrr");
    // }
  };
  useEffect(() => {
    // if (error) console.log("errorrrr");
    // if (!data) return console.log("coming data..");
    // return console.log("this data: ", data);
    register(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(term);
    setTerm("");
  };
  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search All Papers"
        />
      </form>
    </div>
  );
}
