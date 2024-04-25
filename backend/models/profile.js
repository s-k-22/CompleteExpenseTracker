const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Profile = sequelize.define("profile", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profilePhoto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Profile;
