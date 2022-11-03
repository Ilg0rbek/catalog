import { Abstract } from "../../abstract";

export class DesignCardsSizeTypesRepository extends Abstract {
  constructor({ DesignCardSizeTypesModel }) {
    super(DesignCardSizeTypesModel);
    this.DesignCardSizeTypesModel = DesignCardSizeTypesModel;
  }
}
