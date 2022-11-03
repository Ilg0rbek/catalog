import { Abstract } from "../../abstract";

export class WordsRepository extends Abstract {
  constructor({ WordsModel }) {
    super(WordsModel);
    this.WordsModel = WordsModel;
  }
}
