const getCompanyID=require('./get_company_id')
const company_exists=require('./company_exists')
const getCompanyByCompanyID=require('./get_company_by_company_id')
module.exports=Object.freeze({
    getCompanyID,
    company_exists,
    getCompanyByCompanyID
})