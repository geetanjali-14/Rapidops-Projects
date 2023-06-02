const getCompanyID=require('./get_company_id')
const company_exists=require('./company_exists')
const company_exists_by_id=require('./company_exists_by_id')
const getCompanyByCompanyID=require('./get_company_by_company_id')
const getCompanyEmailByCompanyID=require('./get_company_email')
module.exports=Object.freeze({
    getCompanyID,
    company_exists,
    getCompanyByCompanyID,
    company_exists_by_id,
    getCompanyEmailByCompanyID,
})