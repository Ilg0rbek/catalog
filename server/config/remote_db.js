import dotenv from 'dotenv'
dotenv.config()


const logging = false // log sequalize 
const {
  REMOTEDB_NAME: database,
  REMOTEDB_USERNAME: username,
  REMOTEDB_PASSWORD: password,
  REMOTEDB_HOST: host,
  REMOTEDB_PORT: port,
  REMOTEDB_DIALECT: dialect,

} = process.env;

export { database, username, password, host, port, dialect,logging };