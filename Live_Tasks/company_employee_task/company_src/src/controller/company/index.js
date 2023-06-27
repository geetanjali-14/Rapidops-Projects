const Joi=require('joi');
const useCases = require('../../use-cases');
const internalApis=require('../../internal-api-calls')

const makeCompanyExists=require('./company-exists-by-id')
const  createCompanyExist= makeCompanyExists({
    Joi,
    companyExistsById:useCases.company.createCompanyExists,
});
const makeCreateCompany = require('./create-company');
const createCreateCompany = makeCreateCompany({
    Joi,
    createCompany: useCases.company.createCompany,
});


const makeGetAllEmployeesOfCompany=require('./get-all-employee-of-company')
const createGetAllEmployeesOfCompany = makeGetAllEmployeesOfCompany({
    Joi,
    getAllEmployeeofCompany:internalApis.createGetAllEmployeeofCompany.getAllEmployeeofCompany,
    companyExistsByName:useCases.company.companyExistsByName,
});


const makeGetAllCompany= require('./get-all-company')
const createGetAllCompany = makeGetAllCompany({
    Joi,
    getAllCompany:useCases.company.createGetAllCompany,
});


const makeUpdateCompany = require('./update-company');
const createUpdateCompany = makeUpdateCompany({
    Joi,
    updateCompany: useCases.company.createUpdateCompany,
    updateCompanyDetailsInEmployeeTable:internalApis.createUpdateCompanyDetailsInEmployeeTable.updateCompanyDetailsInEmployeeTable,
});


const makeDeleteCompany = require('./delete-company');
const createDeleteCompany = makeDeleteCompany({
    Joi,
    deleteCompany: useCases.company.createDeleteCompany,
    deleteEmployeeOfDeletedCompany:internalApis.createDeleteEmployeeOfDeletedCompany.deleteEmployeeOfDeletedCompany,
    deleteRolesOfDeletedCompany:internalApis.createDeleteRolesOfDeletedCompany.deleteRolesOfDeletedCompany,
});


const makeGetCompanyIdByCompanyName=require('./get-company-id-by-company-name')
const  createGetCompanyIdByCompanyName= makeGetCompanyIdByCompanyName({
    Joi,
    getCompanyIdByCompanyName:useCases.company.createGetCompanyIdByCompanyName,
});


const makeGetCompanyNameByCompanyId=require('./get-company-name-by-company-id')
const  createGetCompanyNameByCompanyId= makeGetCompanyNameByCompanyId({
    Joi,
    getCompanyNameByCompanyId:useCases.company.createGetCompanyNameByCompanyId,
});

const makeGetCompanyEmailByCompanyId=require('./get-company-email-by-company-id')
const  createGetCompanyEmailByCompanyId= makeGetCompanyEmailByCompanyId({
    Joi,
    getCompanyEmailByCompanyId:useCases.company.createGetCompanyEmailByCompanyId,
    companyExists:useCases.company.createCompanyExists,
});


const makeCompanyExistsByName=require('./company-exists-by-name')
const  createCompanyExistsbyName= makeCompanyExistsByName({
    Joi,
    companyExistsByName:useCases.company.createCompanyExistByName,
});



module.exports = Object.freeze({
    createCreateCompany,
    createUpdateCompany,
    createDeleteCompany,
    createGetCompanyIdByCompanyName,
    createCompanyExistsbyName,
    createCompanyExist,
    createGetCompanyNameByCompanyId,
    createGetCompanyEmailByCompanyId,
    createGetAllEmployeesOfCompany,
    createGetAllCompany,
});