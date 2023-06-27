const employee=require('./employee')
const accessTokens=require('./access-token')
const roles=require('./roles')
const employeeRoles=require('./employee-roles')
module.exports=Object.freeze({
    employee,
    accessTokens,
    roles,
    employeeRoles
})