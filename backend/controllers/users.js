const User = require("../models/users");
const Profile = require("../models/profile");
const ForgotPassword = require("../models/forgotPasswords");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const nodemailer = require("nodemailer");

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

      res.status(201).json({
        userDetails: data,
      });
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

exports.sendEmailLink = async (req, res) => {
  const { email } = req.body;
  let html = `<a href="#">Verify Email</a>`;
  const user = await User.findOne({
    where: { email: email },
  });
  if (user) {
    var id = uuid.v4();
    await ForgotPassword.create({ id, userId: user.id });
    html = `<a href="http://localhost:5000/users/resetPassword/${id}">reset password</a>`;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "swar.khatale@gmail.com",
      pass: "mswq hyjf uvxd zced",
    },
  });

  const mailOptions = {
    from: "swar.khatale@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json(info.response);
    }
  });
};

exports.resetPassword = async (req, res) => {
  console.log("resetpasswordform");
  const id = req.params.id;
  console.log(id);
  res.status(200)
    .send(`<form style="max-width: 300px; margin: 0 auto; text-align: center;" method="get" action="http://localhost:5000/users/updatePassword/${id}">
    <label for="password" style="display: block; margin-bottom: 10px;">Password:</label>
    <input type="password" id="password" name="password" style="padding: 8px; width: 100%; margin-bottom: 20px;">

    <input type="submit" value="Reset Password" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
</form>`);
};

exports.updatePassword = async (req, res) => {
  const newPassword = req.query.password;
  const newPassId = req.params.id;

  const passToReset = await ForgotPassword.findOne({
    where: { id: newPassId },
  });
  const user = await User.findOne({ where: { id: passToReset.userId } });

  bcrypt.hash(newPassword, 5, async (err, hash) => {
    await user.update({ password: hash });
    res.status(201).json({ msg: "password is updated" });
  });
};
