const User = require("../models/users");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  const data = await User.create({
    name: username,
    email: email,
    password: password,
  });

  res.status(201).json({ userDetails: data });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    res.status(401).json({ message: "User not found" });
  } else {
    console.log("found");
    if (user.password !== password) {
      res.status(401).json({ message: "User not authorized" });
    } else {
      res.status(201).json({ message: "User logged in successfully" });
    }
  }
};
