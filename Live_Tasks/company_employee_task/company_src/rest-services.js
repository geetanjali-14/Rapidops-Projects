const express = require("express");
const controller = require("./src/controller");
const router = express.Router();
function init() {
    initCompanyRouters();
}

function initCompanyRouters()
{
    router.post("/company",controller.companyController.createCreateCompany);
    router.patch("/company/:companyId",controller.companyController.createUpdateCompany);
    router.delete("/company/:companyId",controller.companyController.createDeleteCompany);
    router.get("/company/:companyName",controller.companyController.createGetCompanyIdByCompanyName)
    router.get("/company/exist/name/:companyName",controller.companyController.createCompanyExistsbyName)
    router.get("/company/exist/id/:companyId",controller.companyController.createCompanyExist)
    router.get("/company/name/:companyId",controller.companyController.createGetCompanyNameByCompanyId)
    router.get("/company/email/:companyId",controller.companyController.createGetCompanyEmailByCompanyId)
    router.get("/company/employees/:companyName",controller.companyController.createGetAllEmployeesOfCompany)
    router.get("/company",controller.companyController.createGetAllCompany)
}
init();
module.exports=router;