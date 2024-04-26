const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const dotenv = require("dotenv").config();

//routes
const userRoutes = require("./routes/users");
const expenseRoutes = require("./routes/expenses");

//models
const User = require("./models/users");
const Profile = require("./models/profile");
const ForgotPassword = require("./models/forgotPasswords");
const Expenses = require("./models/expense");

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

Profile.belongsTo(User);
ForgotPassword.belongsTo(User);
Expenses.belongsTo(User)

sequelize
  .sync()
  .then(() => app.listen(5000, () => console.log("backend on PORT 5000")))
  .catch((e) => console.log(e));
