import moment from "moment";

export const convertMomentToDate = (momentI) => {
  return momentI.toDate();
};
export const convertDateToMoment = (date) => {
  return moment(date);
};
