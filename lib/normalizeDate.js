export const normalizeDate = (date) => {
  let month = date.substr(5, 2);
  let year = date.substr(0, 4);
  const newDate = new Date(`${year}-${month}-01T00:00:00Z`);
  return newDate;
};
