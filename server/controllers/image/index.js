import { ApiError } from "../../exeptions/api-error";
import { multerUploadOne } from "../../helpers/image";
import multer from "multer";
import { responseEnum } from "../../common/enums";

export class ImagesController {
  constructor({ ImageService }) {
    this.ImageService = ImageService;
  }

  async addImage(req, res, next) {
    try {
      const { filename: name } = req.file;

      const response = await this.ImageService.addImage({ name });
      res.data = response;

      return next();
    } catch (e) {
      return next(e);
    }
  }
  async getDefaultImage(req, res, next) {
    try {
      const response = await this.ImageService.getDefaultImage();

      res.data = response;

      return next();
    } catch (e) {
      return next(e);
    }
  }
}
