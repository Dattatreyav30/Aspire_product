const EmployeeModel = require("../../models/employee_model/employeeModel");

const emailSender = require("../../assets/email");

const passwordGenerator = require("../../assets/passwordgenerator");

exports.addOneEmploye = async (req, res) => {
  try {
    const { name, email, city, mobile, department, designation } = req.body;
    const password = passwordGenerator();
    const sameEmployeeCheck = await EmployeeModel.findOne({
      where: { userId: req.user.jwtUserToken, email: email },
    });
    if (sameEmployeeCheck) {
      throw new Error("your employee is already added in database ");
    }
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
      passwordChanged : false
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

exports.addManyEmployees = async (req, res) => {
  try {
    const userDataArray = req.body.userData;

    for (const userData of userDataArray) {
      const { name, email, city, mobile, department, designation } = userData;
      const password = passwordGenerator();

      const sameEmployeeCheck = await EmployeeModel.findOne({
        where: { userId: req.user.jwtUserToken, email: email },
      });

      if (sameEmployeeCheck) {
        continue;
      }
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
        passwordChanged : false
      });

      const content = {
        email: email,
        password: password,
      };
      emailSender(email, name, JSON.stringify(content));
    }

    res.status(200).json({ message: "Employees added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
