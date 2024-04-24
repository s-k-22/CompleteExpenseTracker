const express = require("express");
const cors = require("cors");

const userRoutes = require('./routes/users')

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use('/users',userRoutes)

app.listen(5000, () => console.log("backend on PORT 5000"));
