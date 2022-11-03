import dotenv from "dotenv";
import { settingsConstants } from "../../common/constants";

dotenv.config();

export default {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("settings", [
      {
        key: settingsConstants.WORDS_IN_LESSON,
        value: 10,
        description: "Количество слов в каждом уроке на странице обучение",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: settingsConstants.WORDS_IN_LESSON_APPROWED,
        value: 3,
        description: "Количество слов в каждом уроке на странице обучение людей без подписки",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: settingsConstants.REPEAT_START_PERIOD,
        value: 1,
        description: "Стартовый период для повторения",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: settingsConstants.REPEAT_PERIOD_COEFFICIENT,
        value: 2,
        description:"Коэффициент на который увеличивается период для повторения",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: settingsConstants.REPEAT_PERIOD_ITERATIONS_COUNT,
        value: 5,
        description:"Количество сессий повторения, пока слово не будет считаться ученым",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: settingsConstants.PROMO,
        value: '',
        description:"Количество сессий повторения, пока слово не будет считаться ученым",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("settings", null, {});
  },
};
