export const normalizeDate = (date) => {
  let monthNumber = date?.getMonth();
  monthNumber = monthNumber + 1;
  const year = date?.getFullYear();
  let m;
  if (monthNumber < 10) {
    m = `0${monthNumber}`;
  } else {
    m = `${monthNumber}`;
  }
  let newDate = new Date(`${year}-${m}-01T00:00:00Z`);
  // let month = date.substr(5, 2);
  // let year = date.substr(0, 4);
  // const newDate = new Date(`${year}-${month}-01T00:00:00Z`);
  return newDate;
};
