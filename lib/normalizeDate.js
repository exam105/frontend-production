export const normalizeDate = (date) => {
  let month = date.substr(5, 2);
  let year = date.substr(0, 4);
  const newDate = `${year}-${month}-01T00:00:00Z`;
  console.log("thats date: ", newDate);
  return newDate;
};
