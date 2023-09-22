const sequelize = require("../../util/database");

const Sequelize = require("sequelize");

const forgotModel = sequelize.define("userForgot", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  uniqueId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});

module.exports = forgotModel