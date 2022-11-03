import { call, put } from "redux-saga/effects";
import { alertTypes, toastsMessages } from "../../../common/enum";
import { DesignService, ImageService, WordsService } from "../../../services";
import { addToast } from "../../actions/app";
import {
  setCards,
  setCardsLoading,
  setCardsSizesTypes,
  setDefaultCardSizeType,
} from "../../actions/design";

export function* fetchCardsSizes() {
  try {
    yield put(setCardsLoading(true));

    const response = yield call(DesignService.fetchCardsSizes);
    yield put(setDefaultCardSizeType(getDefaultSize(response?.data)));
    yield put(setCardsSizesTypes(response?.data));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(setCardsLoading(false));
  }
}
export function* fetchCards() {
  try {
    yield put(setCardsLoading(true));
    const { data: themes } = yield call(WordsService.getAllThemes);
    const { data: cards } = yield call(DesignService.fetchAllCards);
    const response = yield call(compareCards, { themes: themes.data, cards });
    yield put(setCards(response));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(setCardsLoading(false));
  }
}

export function* updateCardById({ payload }) {
  try {
    yield put(setCardsLoading(true));
    let { id, data } = payload;
    if (data.image) {
      const image = yield call(ImageService.addImage, { image: data.image });
      data = { ...data, imageId: image.data.id, image: undefined };
    }

    yield call(DesignService.setCardById, { id, data });
    yield put(
      addToast({
        type: alertTypes.SUCCESS,
        message: toastsMessages.SUCCESS_CARD_DATA_UPDATE,
      })
    );
  } catch (e) {
    console.log(e?.response?.data?.message);
  } finally {
    yield put(setCardsLoading(false));
  }
}

function compareCards({ themes, cards }) {
  let customThemes = [];
  const noCustomThemes = themes.filter(
    (el) => !cards.map((el) => el.themeId).includes(el.id)
  );
  for (let i = 0; i < cards.length; i++) {
    let theme = themes.find((el) => el.id === cards[i].themeId);
    customThemes.push({ ...cards[i], ...theme });
  }

  return [...customThemes, ...noCustomThemes];
}

function getDefaultSize(cardSizes) {
  return cardSizes.find((el) => el.default === true);
}
