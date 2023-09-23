const EmployeeModel = require("../../models/employee_model/employeeModel");

exports.addOneEmploye = (req,res,next) =>{
    const {name,email,city,password,mobile,department,designation,isActive,totalPoints} = req.body;
    
}