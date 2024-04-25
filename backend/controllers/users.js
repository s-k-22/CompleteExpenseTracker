const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/profile");

exports.generateAccessToken = (id, name) => {
  return jwt.sign({ userId: id, name: name }, process.env.TOKEN);
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    bcrypt.hash(password, 5, async (err, hash) => {
      const data = await User.create({
        name: username,
        email,
        password: hash,
      });

      res.status(201).json({ userDetails: data });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(401).json({ message: "User not found" });
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) throw new Error(err);
        if (result) {
          res.status(201).json({
            message: "User logged in successfully",
            token: this.generateAccessToken(user.id, user.name),
          });
        } else {
          res.status(401).json({ message: "User not authorized" });
        }
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateProfile = async (req, res) => {
  const { fullName, profilePhoto } = req.body;

  const user = await Profile.findOne({ where: { userId: req.user.id } });
  if (user) {
    const data = await Profile.update(
      { fullName, profilePhoto },
      { where: { userId: req.user.id } }
    );
    res.status(201).json(data);
  } else {
    const data = await Profile.create({
      fullName,
      profilePhoto,
      userId: req.user.id,
    });
    res.status(201).json(data);
  }
};

exports.getProfileDetails = async (req, res) => {
  const data = await Profile.findOne({ where: { userId: req.user.id } });
  if (!data) {
    res.status(204).json({ msg: "data not found" });
  } else {
    res.status(200).json(data);
  }
};
