const getAllEmployeeofCompany=require('./get_employees_of_company')
const deleteEmployeeOfDeletedCompany=require('./delete_employees_of_deleted_company')
const updateCompanyDetailsInEmployeeTable=require('./update_company_details_in_employee_table')
module.exports = Object.freeze({
    getAllEmployeeofCompany,
    deleteEmployeeOfDeletedCompany,
    updateCompanyDetailsInEmployeeTable,
})