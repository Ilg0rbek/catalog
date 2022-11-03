import { Sequelize } from "sequelize";
import * as config from '../../config/db.js'

export const client = new Sequelize({
  ...config,
});
