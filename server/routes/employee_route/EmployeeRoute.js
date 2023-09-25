const express = require("express");

const router = express.Router();

const EmployeeController = require("../../controllers/employee_controller/employeeController");

router.post("/set-password", EmployeeController.userPassword);

router.post("/login", EmployeeController.login);

module.exports = router;
