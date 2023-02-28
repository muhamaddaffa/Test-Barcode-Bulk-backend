const { Sequelize, Op, DataTypes } = require("sequelize");
const {
  database,
  username,
  password,
  host,
  dialect,
  ssl,
  port,
} = require("../config");
// const Logger = require("../middleware/logger");

const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: dialect,
  timezone: "+07:00",
  operatorsAliases: false,
  dialectOptions: {
    ssl: ssl,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // logging: (msg) => Logger.info(msg),
});

module.exports.sequelize = sequelize;
module.exports.Op = Op;
module.exports.DataTypes = DataTypes;
