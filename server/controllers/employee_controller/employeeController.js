const Employee = require("../../models/employee_model/employeeModel");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../../middleware/userAuth");
exports.userPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDetails = await Employee.findOne({ where: { email: email } });
    if (!userDetails) {
      throw new Error("Please register your email id with your company");
    }
    const hash = await bcrypt.hash(password, 5);
    const updatedDetails = await Employee.update(
      { password: hash, passwordChanged: true },
      { where: { email: email } }
    );
    if (!updatedDetails) {
      throw new Error("can't update right now");
    }
    res.status(500).json({ message: "succesfull" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await Employee.findOne({
      email: email,
    });
    if (!userDetails) {
      throw new Error("please update your email with your boss");
    }
    const match = await bcrypt.compare(password, userDetails.password);
    if (!match) {
      throw new Error("Password is incorrect");
    }
    if (!userDetails.passwordChanged) {
      throw new Error("please change your password");
    }

    res.status(200).json({
      message: "User logged in succesfully",
      userId: generateAccessToken(userDetails.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
