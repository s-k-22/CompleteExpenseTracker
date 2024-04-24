const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");

//routes
const userRoutes = require("./routes/users");

//models
const User = require('./models/users')

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/users", userRoutes);

sequelize
  .sync()
  .then(() => app.listen(5000, () => console.log("backend on PORT 5000")))
  .catch((e) => console.log(e));
