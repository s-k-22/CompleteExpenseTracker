const User = require("../models/users");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 5, async (err, hash) => {
    const data = await User.create({
      name: username,
      email,
      password: hash,
    });

    res.status(201).json({ userDetails: data });
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    res.status(401).json({ message: "User not found" });
  } else {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) throw new Error(err);
      if (result) {
        res.status(201).json({ message: "User logged in successfully" });
      } else {
        res.status(401).json({ message: "User not authorized" });
      }
    });
  }
};
