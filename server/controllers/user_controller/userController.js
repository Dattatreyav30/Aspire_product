const User = require("../../models/user_model/userModel");

const bcrypt = require("bcrypt");

const emailSender = require("../../middleware/email");

exports.userSignup = async (req, res) => {
  try {
    const { companyName, companyLogoUrl, mobile, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await User.create({
      companyName,
      companyLogoUrl,
      mobile,
      email,
      password: hashedPassword,
    });
    emailSender(email, companyName); // here sending to verification link to company
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
