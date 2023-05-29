const Joi=require('joi');
const dataAccess = require('../../data-access');
const makeCreateEmployeeUseCase = require('./create_employee');
const makeEmployeeExistsUsecase=require('./employee_exists')
const makeGetEmployeeByCompanyUseCase = require('./get_employee_by_company_name');
const makeGetAllEmployeeUseCase = require('./get_all_employees');
const makeDeleteEmployeeUseCase=require('./delete_employee')
const makeUpdateEmployeeUseCase=require('./update_employee_details')
const makeDeleteEmployeeOfDeletedCompanyUseCase=require('./delete_employee_when_company_is_deleted')
const makeUpdateEmployeeWhenCompanyDetailsChangesUseCase=require('./update_employee_when_cmpany_details_upadtes')
const makegetCompanyNameByCompanyId=require('./get-company-by-company_id')

const createCreateEmployeeFunction=makeCreateEmployeeUseCase({
    Joi,
    employeeDB:dataAccess.employeeDB,
})

const creategetCompanyNameByCompanyId=makegetCompanyNameByCompanyId({
    Joi,
    employeeDB:dataAccess.employeeDB,
})

const createEmployeeExistsFunction=makeEmployeeExistsUsecase({
    Joi,
    employeeDB:dataAccess.employeeDB,
})
const createGetEmployeeByCompanyUseCase=makeGetEmployeeByCompanyUseCase({
    Joi,
    employeeDB:dataAccess.employeeDB,
})

const createGetAllEmployeeUseCase=makeGetAllEmployeeUseCase({
    employeeDB:dataAccess.employeeDB,
})

const createDeleteEmployeeUseCase=makeDeleteEmployeeUseCase({
    Joi,
    employeeDB:dataAccess.employeeDB,
})

const createDeleteEmployeeOfDeletedCompanyUseCase=makeDeleteEmployeeOfDeletedCompanyUseCase({
    Joi,
    employeeDB:dataAccess.employeeDB,
})

const createUpdateEmployeeUseCase=makeUpdateEmployeeUseCase({
    Joi,
    employeeDB:dataAccess.employeeDB,
})

const createUpdateEmployeeWhenCompanyDetailsChangesUseCase=makeUpdateEmployeeWhenCompanyDetailsChangesUseCase({
    Joi,
    employeeDB:dataAccess.employeeDB,
})


module.exports = Object.freeze({
    createCreateEmployeeFunction,
    creategetCompanyNameByCompanyId,
    createGetEmployeeByCompanyUseCase,
    createGetAllEmployeeUseCase,
    createDeleteEmployeeUseCase,
    createEmployeeExistsFunction,
    createUpdateEmployeeUseCase,
    createDeleteEmployeeOfDeletedCompanyUseCase,
    createUpdateEmployeeWhenCompanyDetailsChangesUseCase,
});