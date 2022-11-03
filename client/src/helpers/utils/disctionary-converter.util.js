export const dictionaryConverter = ({ words }) => {
  try {
    const regex = new RegExp('[a-zA-Z]');
    const dictionaryObj = {};
    const getFirstLetter = (word) => {
      return word.from.text.charAt(0);
    };
    words.forEach((word) => {
      let firstLetter = getFirstLetter(word);
      if (regex.test(firstLetter)) {
        if (firstLetter.toUpperCase() in dictionaryObj) {
          dictionaryObj[firstLetter.toUpperCase()] = [
            ...dictionaryObj[firstLetter.toUpperCase()],
            word,
          ];
        } else {
          dictionaryObj[firstLetter.toUpperCase()] = [word];
        }
      }
    });
    const ordered = {};
    Object.keys(dictionaryObj).sort().forEach(function(key) {
      ordered[key] = dictionaryObj[key];
    });
    return ordered;
  } catch (err) {
    console.log(err);
  }
};
