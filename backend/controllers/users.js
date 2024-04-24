const User = require("../models/users");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  const data = await User.create({
    name: username,
    email: email,
    password: password,
  });

  res.status(201).json({userDetails:data})
};
