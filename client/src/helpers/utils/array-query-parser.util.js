export const arrayQueryParser = (arr) => {
  return `[${arr.map((el) => `"${el}"`).join(",")}]`;
};
