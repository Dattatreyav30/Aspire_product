const sequelize = require("../../util/database");
const Sequelize = require("sequelize");

const emailVerificationModel = sequelize.define("EmailVerification", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uniqueId: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = emailVerificationModel;
