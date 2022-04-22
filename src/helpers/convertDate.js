export const convertDate = (data) => {
  const date = new Date(data.date);
  const datePlusOne = new Date(date);
  datePlusOne.setDate(date.getDate() + 1);
  const parsedDate = datePlusOne.toLocaleDateString("en-GB");
  return parsedDate;
};
