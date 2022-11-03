import { Abstract } from "../../abstract";

export class WordsUsersRepository extends Abstract {
  constructor({ WordUserModel }) {
    super(WordUserModel);
    this.WordsModel = WordUserModel;
  }
}
