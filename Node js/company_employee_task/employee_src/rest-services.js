const express = require("express");
const controller = require("./src/controller");
const router = express.Router();
function init() {
    initEmployeeRouters();
}

function initEmployeeRouters()
{
    router.post("/employee",controller.employeeController.createCreateEmployeeController);
    router.get("/employee/:company_id",controller.employeeController.createGetCompanyByCompanyIdController);
    router.get("/employee_list/:company_name",controller.employeeController.createGetEmployeesByCompanyNameController)
    router.get("/all_employee",controller.employeeController.createGetAllEmployeesController)
    router.delete("/employee/:employee_id",controller.employeeController.createDeleteEmployeesController)
    router.delete("/employees/:company_id",controller.employeeController.createDeleteEmployeesOfDeletedCompanyController)
    router.put("/employee/:employee_id",controller.employeeController.createUpdateEmployeeController);
    router.put("/employees/:company_id",controller.employeeController.createUpdateEmployeeWhenCompanyTableUpdatesController);
}
init();
module.exports=router;