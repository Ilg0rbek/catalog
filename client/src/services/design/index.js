import { endpointEnum } from "../../common/enum";
import { $api_user } from "../../helpers";

export class DesignService {
  static fetchCardsSizes() {
    return $api_user.get(endpointEnum.FETCH_ALL_CARDS_SIZE_TYPES);
  }
  static fetchAllCards() {
    return $api_user.get(endpointEnum.FETCH_ALL_CARDS);
  }
  static setCardById({ id, data }) {
    return $api_user.post(`${endpointEnum.SET_CARD}/${id}`, { data });
  }
}
