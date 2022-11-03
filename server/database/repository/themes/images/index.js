import { Abstract } from "../../abstract";

export class ImagesRepository extends Abstract {
  constructor({ ImagesModel }) {
    super(ImagesModel);
    this.ImagesModel = ImagesModel;
  }
}
