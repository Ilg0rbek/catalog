export const dateDifferent = ({ date1, date2 }) => {
  const diff = date1 - date2;

  const milliseconds = diff;
  const seconds = milliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  return `${Math.round(days) < 0 ? 0 : Math.round(days)} дней`;
};
