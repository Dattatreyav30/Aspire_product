const Employee = require("../../models/employee_model/employeeModel");
const bcrypt = require("bcrypt");

exports.userPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 5);
    const updatedDetails = await Employee.update({ password: hash });
    await Employee.update({ passwordChange: true });
    if (!updatedDetails) {
      throw new Error("can't update right now");
    }
    res.status(500).json({ message: "succesfull" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
