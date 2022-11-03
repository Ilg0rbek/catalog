import { Abstract } from "../abstract";

export class SettingsRepository extends Abstract {
  constructor({ SettingsModel }) {
    super(SettingsModel);
    this.SettingsModel = SettingsModel;
  }
}
