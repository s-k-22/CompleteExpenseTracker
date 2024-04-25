const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    const decoded = jwt.verify(token, process.env.TOKEN);
    // console.log(decoded);
    req.user = await User.findByPk(decoded.userId);
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
};
