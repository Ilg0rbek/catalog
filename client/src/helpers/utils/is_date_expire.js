export const isExpire = ({ date, days }) => {
  if (date) {
    const diff = new Date() - new Date(date);
    const milliseconds = diff;
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const currentDays = hours / 24;
    return currentDays > days;
  }

  return false;
};
