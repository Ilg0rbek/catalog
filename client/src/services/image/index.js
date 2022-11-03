import { endpointEnum } from "../../common/enum";
import { $api_user } from "../../helpers";

export class ImageService {
  static addImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);
    return $api_user({
      method: "post",
      url: endpointEnum.ADD_IMAGE,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  static getImageByID = (id) => {};
}
