export class DesignController {
  constructor({ DesignService }) {
    this.DesignService = DesignService;
  }

  async getAllCards(req, res, next) {
    try {
      const cards = await this.DesignService.getAllCards();
      res.data = cards;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async setCardById(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const cards = await this.DesignService.setCardById({ id, data });
      res.data = cards;
      return next();
    } catch (err) {
      return next(err);
    }
  }
  async getAllCardsSizes(req, res, next) {
    try {
      const cardsSizes = await this.DesignService.getAllCardsSizes();
      res.data = cardsSizes;
      return next();
    } catch (err) {
      return next(err);
    }
  }
  async getCardById(req, res, next) {
    try {
      const { id } = req.params;
      const card = await this.DesignService.getCardById({ id });
      res.data = card;
      return next();
    } catch (err) {
      return next(err);
    }
  }
}
