const User = require("../../models/user_model/userModel");
const bcrypt = require("bcrypt");

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
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error in userSignup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
