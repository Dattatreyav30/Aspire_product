const EmployeeModel = require("../../models/employee_model/employeeModel");

const emailSender = require("../../assets/email");

const passwordGenerator = require("../../assets/passwordgenerator");

exports.addOneEmploye = async (req, res) => {
  try {
    const { name, email, city, mobile, department, designation } = req.body;
    const password = passwordGenerator();
    await EmployeeModel.create({
      name,
      email,
      city,
      mobile,
      department,
      designation,
      isActive: true,
      totalPoints: 0,
      password: password,
      userId: req.user.jwtUserToken,
    });
    const content = {
      email: email,
      password: password,
    };
    emailSender(email, name, JSON.stringify(content));
    res.status(200).json({ message: "employee addded succesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
