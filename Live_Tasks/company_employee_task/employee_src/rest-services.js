const express = require("express");
const controller = require("./src/controller");
const router = express.Router();
const app = express();
const multer = require("multer");
const upload = multer({ dest:'./src/uploads/'});
const middleware = require("./src/middleware");

function init() {
    initEmployeeRouters();
    app.use(router); 
}

function initEmployeeRouters() {
    router.post("/employees/",controller.employeeController.createDeleteMultipleEmployees);
    router.post("/employee", controller.employeeController.createCreateEmployee);
    router.post('/employee/login',controller.employeeController.createEmployeeLogin)
    router.post("/employee/upload",middleware.createCheckPermissions,upload.single('file'),controller.employeeController.createUploadFile);
    // router.post('/master/:employeeId',middleware.createCheckPermissions,controller.rolesController.createAssignMaster)

    router.get("/employee/:companyId", middleware.createCheckPermissions,controller.employeeController.createGetCompanyNameByCompanyId);
    router.get("/employee/list/:companyName", middleware.createCheckPermissions,controller.employeeController.createGetEmployeesByCompanyName);
    router.get("/employees", middleware.createCheckPermissions,controller.employeeController.createGetAllEmployees);
    router.get('/employee/filter',middleware.createCheckPermissions,controller.employeeController.createFilterEmployee);
    router.get('/employee/download/:fileName',middleware.createCheckPermissions,controller.employeeController.createDownloadFile);
    
    router.delete("/employee/:employeeId",middleware.createCheckPermissions, controller.employeeController.createDeleteEmployees);
    router.delete("/employee/company/:companyId",controller.employeeController.createDeleteEmployeesOfDeletedCompany);
    router.put("/employee/:employeeId", middleware.createCheckPermissions,controller.employeeController.createUpdateEmployee);
    router.put("/employees/company/:companyId", middleware.createCheckPermissions,controller.employeeController.createUpdateEmployeeWhenCompanyTableUpdates);
    
    // Access token
    router.get("/employee/:employeeEmail/:verificationToken",controller.employeeController.createUpdateEmployeeAccessToken);
    
    //Roles 
    router.post("/role",middleware.createCheckPermissions,controller.rolesController.createCreateRole)
    router.get('/role',middleware.createCheckPermissions,controller.rolesController.createFetchAllRole)
    router.delete("/role/company/:companyId",controller.rolesController.createDeleteRolesOfDeletedCompany);

    //Roles_employee_association 
    router.post("/employee/roles",middleware.createCheckPermissions,controller.employeeRolesController.createAssignRolesToEmployee)
}
init();

module.exports = router;