import { Abstract } from "../../abstract";

export class DesignCardsRepository extends Abstract {
  constructor({ DesignCardsModel, DesignCardSizeTypesModel, ImagesModel }) {
    super(DesignCardsModel);
    this.DesignCardSizeTypesModel = DesignCardSizeTypesModel;
    this.DesignCardsModel = DesignCardsModel;
    this.ImagesModel = ImagesModel;
  }

  getByFilter(options = {}) {
    return this.DesignCardsModel.findAll({
      include: [
        {
          model: this.DesignCardSizeTypesModel,
          as: "size",
        },
        {
          model: this.ImagesModel,
          as: "image",
        },
      ],
      required: true,
      where: {
        ...options,
      },
      order: [
        ['sort', 'DESC']
      ],
    });
  }
  updateByParams(params, data) {
    let extraData = data;
    if (data.isImageClear === true) {
      extraData = { ...extraData, imageId: null };
    }
    const result = this.model.update(extraData, {
      where: {
        ...params,
      },
      returning: true,
      plain: true,
    });
    return result;
  }
}
