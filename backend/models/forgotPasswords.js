const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ForgotPassword = sequelize.define("forgotPasswords", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = ForgotPassword;
