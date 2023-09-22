const User = require("../../models/user_model/userModel");
const emailVerificationModel = require("../../models/user_model/emailVerificationModel");
// const userForgotPasswordModel = require("../../models/user_model/forgotModel");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRETKEY;

const emailSender = require("../../assets/email");
const generateAccessToken =
  require("../../assets/generateAccessToken").generateAccessToken;

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
      isVerified: false,
    });

    const uuid = uuidv4();
    const jwtUserId = jwt.sign({ userId: newUser.id }, jwtSecretKey);

    emailSender(
      email,
      companyName,
      `http://localhost:7000/user/verification/${jwtUserId}/${uuid}`,
      "Email Verification"
    );
    await emailVerificationModel.create({
      uniqueId: uuid,
      isActive: true,
      userId: newUser.id,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verification = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const userId = req.user.userId;
    const verificationRow = await emailVerificationModel.findOne({
      where: { userId: userId, uniqueId: uniqueId, isActive: true },
    });
    if (!verificationRow) {
      return res
        .status(400)
        .json({ message: "Email is already verified or the link is invalid" });
    }
    await emailVerificationModel.update(
      { isActive: false },
      { where: { userId: userId, uniqueId: uniqueId } }
    );
    await User.update({ isVerified: true }, { where: { id: userId } });
    res.status(200).json({ message: "Email verification successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const userDetails = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!userDetails) {
      throw new Error("User not found");
    }

    if (!userDetails.isVerified) {
      throw new Error("please verify your email address");
    }

    const match = await bcrypt.compare(password, userDetails.password);
    if (!match) {
      throw new Error("Password is incorrect");
    }
    res.status(200).json({
      message: "User logged in succesfully",
      userId: generateAccessToken(userDetails.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetPasswordLink = async (req, res) => {
  try {
    // const uniqueId = req.params.uniqueId;
    // const userId = req.user.userId;
    // const emailForgotPassword = await userForgotPasswordModel.findOne({
    //   where: { userId: userId, uniqueId: uniqueId, isActive: true },
    // });
    const { email } = req.body;
    const userDetails = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!userDetails) {
      throw new Error("please enter valid email address");
    }
    const uuid = uuidv4();
    const jwtToken = jwt.sign({ userId: userDetails.id }, jwtSecretKey);
    console.log(jwtToken);

    emailSender(
      email,
      userDetails.companyName,
      `http://localhost:7000/user/update-password/${jwtToken}/${uuid} `,
      `Reset Password Link`
    );
    res.status(200).json({ message: "reset password link sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
