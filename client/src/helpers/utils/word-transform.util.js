export function compareWords({
  words,
  customWords,
  onlyCustom = false,
  override = false,
}) {
  let modifyWords = [];
  let noModifyWords = [];
  for (let i = 0; i < words.length; i++) {
    noModifyWords.push({ ...words[i], modified: false });
  }
  for (let i = 0; i < customWords.length; i++) {
    let elem = Object.entries(noModifyWords).find(
      ([index, el]) => el.id == customWords[i].wordId && { word: el, index }
    );
    if (elem) {
      const [index, word] = elem;
      if (word) {
        modifyWords.push({
          ...customWords[i],
          ...word,
          progress: customWords[i].progress,
          modified: true,
          wordId: customWords[i].id,
        });
        noModifyWords.splice(index, 1);
      }
    }
  }
  if (onlyCustom) {
    return [...modifyWords];
  }
  if (override) {
    return [...noModifyWords, ...modifyWords];
  }

  return [...modifyWords, ...noModifyWords];
}

export function replaceWord({ words, customWord }) {
  const newWords = words.map((word) => {
    if (word.id === customWord.wordId) {
      return {
        ...customWord,
        ...word,
        progress: customWord.progress,
        modified: true,
        wordId: customWord.id,
      };
    } else {
      return word;
    }
  });
  return newWords;
}

export function replaceDictionaryWord({ dictionaryWords, customWord, key }) {
  const words = dictionaryWords[key];
  console.log(dictionaryWords, dictionaryWords[key], key);
  const newWords = words.map((word) => {
    if (word.id === customWord.wordId) {
      return {
        ...customWord,
        ...word,
        progress: customWord.progress,
        modified: true,
        wordId: customWord.id,
      };
    } else {
      return word;
    }
  });
  return { ...dictionaryWords, [key]: newWords };
}
