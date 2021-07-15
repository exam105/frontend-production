import { useState, useEffect } from "react";
import useSWR from "swr";
import styles from "@/styles/Search.module.css";

export default function Search() {
  const [term, setTerm] = useState("");
  // const url = "http://dev.exam105.com:9090/dashboard/de/search/date";
  const user = {
    subject: "Math",
    system: "GCSE",
    board: "Edexcel",
    date: "2021-02-01T00:00:00.000Z",
  };
  // const fetcher = (url) =>
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   }).then((res) => res.json());

  // function Profile() {}
  // const { data, error } = useSWR(url, fetcher);
  // const register = async (user) => {
  //   const res = await fetch(
  //     "http://dev.exam105.com:9090/dashboard/de/search/date",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user),
  //     }
  //   );

  //   const data = await res.json();
  //   if (res.ok) {
  //     console.log(data);
  //   } else {
  //     console.log("errorrrr");
  //   }
  // };
  // useEffect(() => {
  //   // if (error) console.log("errorrrr");
  //   // if (!data) return console.log("coming data..");
  //   // return console.log("this data: ", data);
  //   register(user);
  // }, []);
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
