export class UserController {
  constructor({ UserService }) {
    this.UserService = UserService;
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.UserService.getAllUsers();
      res.data = users;
      return next();
    } catch (err) {
      return next(err);
    }
  }
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.UserService.getUserById(id);
      res.data = user;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async cashoutRequest(req, res, next) {
      try {
      const { data } = req.body; 
      const { id } = req.params;  
      const user = await this.UserService.cashoutRequest({ id, data });
      res.data = user;
      next();
    } catch (err) {
      return next(err);
    }
  }

  async addHistory(req, res, next) {
    try {
      const data = await this.UserService.addHistory(req.body);
      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = req.body; // number , {}
      const user = await this.UserService.updateUserById({ id, data });
      res.data = user;
      return next();
    } catch (err) {
      return next(err);
    }
  }
  async setUserBanStatusById(req, res, next) {
    try {
      const { id } = req.params;
      const { isBanned } = req.body; // number boolean
      const user = await this.UserService.setUserBanStatusById({
        id,
        isBanned,
      });
      res.data = user;
      return next();
    } catch (err) {
      return next(err);
    }
  }
  async setUserBuySubscribeStatusById(req, res, next) {
    try {
      const { id } = req.params;
      const { subscribe } = req.body; // number boolean
      const user = await this.UserService.setUserBuySubscribeStatusById({
        id,
        subscribe,
      });
      res.data = user;
      return next();
    } catch (err) {
      return next(err);
    }
  }
  async approveUserById(req, res, next) {
    try {
      const { id } = req.params;
      const { isApproved } = req.body; // number boolean
      const user = await this.UserService.approveUserById({
        id,
        isApproved,
      });
      res.data = user;
      return next();
    } catch (err) {
      return next(err);
    }
  }
  async addWord(req, res, next) {
    try {
      const { wordId, userId, type } = req.body;
      const response = await this.UserService.addWord({ wordId, userId, type });
      res.data = response;
      next();
    } catch (err) {
      return next(err);
    }
  }
  async getWords(req, res, next) {
    try {
      let { id, type } = req.query;
      let response = await this.UserService.getWords({ id, type });
      // handle empty server answer
      if (!response) {
        response = { words: [] };
      }
      res.data = response;
      next();
    } catch (err) {
      next(err);
    }
  }
  async setUserWordStatus(req, res, next) {
    try {
      const { userId, wordId, type, days, lastRepeatDate, isFinish } = req.body;
      const response = await this.UserService.setUserWordStatus({
        userId,
        wordId,
        type,
        days,
        lastRepeatDate,
        isFinish,
      });
      res.data = response;
      next();
    } catch (err) {
      next(err);
    }
  }

  async deletePromo(req, res, next) {
    try {
      const { key, value } = req.body;
      const response = await this.UserService.deletePromo({ key, value });
      res.data = response;
      next();
    } catch (err) {
      next(err);
    }
  }

  async checkHistory(req, res, next) {
    try {
      const { userId, key, value } = req.params;
      const response = await this.UserService.checkHistory({ userId, key, value });
      res.data = response;
      next();
    } catch (err) {
      next(err);
    }
  }


}
