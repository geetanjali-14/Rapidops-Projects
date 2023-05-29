const express = require("express");
const controller = require("./src/controller");
const router = express.Router();
function init() {
    initCompanyRouters();
}

function initCompanyRouters()
{
    router.post("/company",controller.companyController.createCreateCompanyController);
    router.put("/company/:company_id",controller.companyController.createUpdateCompanyController);
    router.delete("/company/:company_id",controller.companyController.createDeleteCompanyController);
    router.get("/company/:company_name",controller.companyController.createGetCompanyIdByCompanyNameController)
    router.get("/company_exists/:company_name",controller.companyController.createCompanyExistsbyNameController)
    router.get("/company_name/:company_id",controller.companyController.createGetCompanyNameByCompanyIdController)
    router.get("/company_employees/:company_name",controller.companyController.createGetAllEmployeesOfCompanyController)
    router.get("/company",controller.companyController.createGetAllCompanyController)
}
init();
module.exports=router;