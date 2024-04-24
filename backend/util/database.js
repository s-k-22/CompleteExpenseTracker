const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "complete_expense_tracker",
  "root",
  "chikenfry14",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
