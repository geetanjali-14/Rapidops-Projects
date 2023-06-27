const axios = require('axios');
const {serviceEndpoints} = require('../config');

const makeGetAllEmployeeofCompany=require('./get-employees-of-company')
const createGetAllEmployeeofCompany=makeGetAllEmployeeofCompany({
    axios,
    serviceEndpoints
})

const makeDeleteEmployeeOfDeletedCompany=require('./delete-employees-of-deleted-company')
const createDeleteEmployeeOfDeletedCompany=makeDeleteEmployeeOfDeletedCompany({
    axios,
    serviceEndpoints,
})

const makeUpdateCompanyDetailsInEmployeeTable=require('./update-company-details-in-employee-table')
const createUpdateCompanyDetailsInEmployeeTable=makeUpdateCompanyDetailsInEmployeeTable({
    axios,
    serviceEndpoints,
})

const makeDeleteRolesOfDeletedCompany=require('./delete-roles-of-deleted-company')
const createDeleteRolesOfDeletedCompany=makeDeleteRolesOfDeletedCompany({
    axios,
    serviceEndpoints,
})
module.exports = Object.freeze({
    createGetAllEmployeeofCompany,
    createDeleteEmployeeOfDeletedCompany,
    createUpdateCompanyDetailsInEmployeeTable,
    createDeleteRolesOfDeletedCompany,
})