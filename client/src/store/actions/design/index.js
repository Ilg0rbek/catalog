import { actionTypes } from "../../../common/enum";

function setCardsSizesTypes(cardsSizeTypes) {
  return {
    type: actionTypes.SET_CARDS_SIZE_TYPES,
    payload: {
      cardsSizeTypes,
    },
  };
}
function setCards(cards) {
  return {
    type: actionTypes.SET_CARDS,
    payload: {
      cards,
    },
  };
}
function setCardsLoading(loading) {
  return {
    type: actionTypes.SET_CARDS_LOADER,
    payload: {
      loading,
    },
  };
}

function setDefaultCardSizeType(size) {
  return {
    type: actionTypes.SET_DEFAULT_CARD_SIZE_TYPE,
    payload: {
      size,
    },
  };
}

export {
  setCardsSizesTypes,
  setCards,
  setCardsLoading,
  setDefaultCardSizeType,
};
