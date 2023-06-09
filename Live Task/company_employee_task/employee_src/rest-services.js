const express = require("express");
const controller = require("./src/controller");
const router = express.Router();
const app = express();

function init() {
    initEmployeeRouters();
    app.use(router); 
}

function initEmployeeRouters() {
    router.post("/employee", controller.employeeController.createCreateEmployeeController);
    router.get("/employee/:company_id", controller.employeeController.createGetCompanyByCompanyIdController);
    router.get("/employee/:employee_email/:verification_token", controller.employeeController.createUpdateEmployeeVerificationTokenController);
    router.get("/employee_list", controller.employeeController.createGetEmployeesByCompanyNameController);
    router.get("/all_employee", controller.employeeController.createGetAllEmployeesController);
    router.delete("/employee/:employee_id", controller.employeeController.createDeleteEmployeesController);
    router.delete("/employee_company/:company_id", controller.employeeController.createDeleteEmployeesOfDeletedCompanyController);
    router.put("/employee/:employee_id", controller.employeeController.createUpdateEmployeeController);
    router.put("/employees/:company_id", controller.employeeController.createUpdateEmployeeWhenCompanyTableUpdatesController);
    router.post('/employee_login',controller.employeeController.createEmployeeLoginController)
}

init();

module.exports = router;
