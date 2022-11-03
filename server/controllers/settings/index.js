export class SettingsController {
  constructor({ SettingsService }) {
    this.SettingsService = SettingsService;
  }
  async setProperty(req, res, next) {
    try {
      const { key, value } = req.body;
      const response = await this.SettingsService.setProperty({ key, value });
      res.data = response;
      return next();
    } catch (err) {
      return next(err);
    }
  }
  async getProperty(req, res, next) {
    try {
      const { key } = req.params;
      const response = await this.SettingsService.getProperty({ key });
      res.data = response;
      return next();
    } catch (err) {
      next(err);
    }
  }
  async getAll(req, res, next) {
    try {
      const response = await this.SettingsService.getAll();
      res.data = response;
      return next();
    } catch (err) {
      next(err);
    }
  }
}
