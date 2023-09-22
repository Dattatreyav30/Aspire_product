const User = require("../../models/user_model/userModel");
const emailVerificationModel = require("../../models/user_model/emailVerificationModel");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRETKEY;

const emailSender = require("../../assets/email");

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
      isVerified : false
    });

    const uuid = uuidv4();
    const jwtUserId = jwt.sign({ userId: newUser.id }, jwtSecretKey);

    emailSender(email, companyName, `${jwtUserId}/${uuid}`); // here sending to verification link to company

    await emailVerificationModel.create({
      uniqueId: uuid,
      isActive: true,
      userId: newUser.id,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verification = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const jwtUserId = req.params.userId;

    let user;
    try {
      user = jwt.verify(jwtUserId, jwtSecretKey);
    } catch (jwtError) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const verificationRow = await emailVerificationModel.findOne({
      where: { userId: user.userId, uniqueId: uniqueId, isActive: true },
    });
    if (!verificationRow) {
      return res
        .status(400)
        .json({ message: "Email is already verified or the link is invalid" });
    }
    await emailVerificationModel.update(
      { isActive: false },
      { where: { userId: user.userId, uniqueId: uniqueId } }
    );
    await User.update({isVerified : true},{where : {id : user.userId}})
    res.status(200).json({ message: "Email verification successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
