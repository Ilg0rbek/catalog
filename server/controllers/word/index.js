export class WordController {
  constructor({ WordsService }) {
    this.WordsService = WordsService;
  }
  async addWord(req, res, next) {
    try {
      const { wordId } = req.body;
      const response = await this.WordsService.addWord(wordId);
      res.data = response;
      return next();
    } catch (err) {
      return next(err);
    }
  }
  async checkWordOnExists(req, res, next) {
    try {
      const { wordId } = req.params;
      const response = await this.WordsService.checkWordOnExists(wordId);
      res.data = response;
      return next();
    } catch (err) {
      next(err);
    }
  }
  async getAll(req, res, next) {
    try {
      const response = await this.WordsService.getAll();
      res.data = response;
      return next();
    } catch (err) {
      next(err);
    }
  }
}
