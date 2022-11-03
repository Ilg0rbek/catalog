export class SettingsService {
  constructor({ SettingsRepository }) {
    this.SettingsRepository = SettingsRepository;
  }
  async setProperty({ key, value }) {
    return this.SettingsRepository.updateByParams({ key }, { value });
  }
  async getProperty({ key }) {
    return this.SettingsRepository.findOneByParams({ key });
  }
  async getAll() {
    return this.SettingsRepository.getAll();
  }
}
