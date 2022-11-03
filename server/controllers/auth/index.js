import dotenv from "dotenv";
import {
  cookieNamesConstants,
  lifetimesConstants,
} from "../../common/constants";

dotenv.config();

export class AuthController {
  constructor({ AuthService }) {
    this.AuthService = AuthService;
  }

  async registration(req, res, next) {
    try {
      const data = await this.AuthService.registration(req.body);

      res.cookie(cookieNamesConstants.REFRESH_TOKEN, data.refreshToken, {
        maxAge: lifetimesConstants.COOKIE_LIFE_TIME,
        httpOnly: true,
      });

      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async vkAuth(req, res, next) {
    try {
      const { vkId, referer } = req.body;
      const data = await this.AuthService.vkAuth({ vkId, referer });

      res.cookie(cookieNamesConstants.REFRESH_TOKEN, data.refreshToken, {
        maxAge: lifetimesConstants.COOKIE_LIFE_TIME,
        httpOnly: true,
      });

      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async oauthVk(req, res, next) {
    try {
      const { code } = req.body;
      const data = await this.AuthService.oauthVk({ code });
      res.cookie(cookieNamesConstants.REFRESH_TOKEN, data.refreshToken, {
        maxAge: lifetimesConstants.COOKIE_LIFE_TIME,
        httpOnly: true,
      });

      res.data = data;

      return next();
    } catch (err) {
      return next(err);
    }
  }

  async googleAuth(req, res, next) {
    try {
      const { email, referer } = req.body;
      const data = await this.AuthService.googleAuth({ email, referer });

      res.cookie(cookieNamesConstants.REFRESH_TOKEN, data.refreshToken, {
        maxAge: lifetimesConstants.COOKIE_LIFE_TIME,
        httpOnly: true,
      });

      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }


  async login(req, res, next) {
    try {
      const { password, email } = req.body;
      const data = await this.AuthService.logIn({ password, email });

      res.cookie(cookieNamesConstants.REFRESH_TOKEN, data.refreshToken, {
        maxAge: lifetimesConstants.COOKIE_LIFE_TIME,
        httpOnly: true,
      });

      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      res.clearCookie(cookieNamesConstants.REFRESH_TOKEN);

      const data = await this.AuthService.logOut({ refreshToken });
      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async activate(req, res, next) {
    try {
      await this.AuthService.activate(req.params.link);
      return res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      return next(err);
    }
  }

  async refresh(req, res, next) {
    const { refreshToken } = req.cookies;
    try {
      const data = await this.AuthService.refresh({ refreshToken });
      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async reset(req, res, next) {
    const { userId, token, password } = req.body;
    try {
      const data = await this.AuthService.reset({ userId, token, password });
      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }
  async resetPassword(req, res, next) {
    try {
      const { email } = req.body;
      const data = await this.AuthService.resetPassword({ email });
      res.data = data;
      next();
    } catch (err) {
      return next(err);
    }
  }

  async sendPayLink(req, res, next) {
    try {
      const email = req.cookies['LOGIN%2FEMAIL'];
      const data = await this.AuthService.sendPayLink({ email, amount: req.params.amount });
      res.data = data;
      next();
    } catch (err) {
      return next(err);
    }
  }
}
