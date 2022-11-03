import { Abstract } from "../../abstract/index.js";

export class RoleRepository extends Abstract {
  constructor({ RoleModel }) {
    super(RoleModel);
    this.RoleModel = RoleModel;
  }
}
