const Joi=require('joi');
const dataAccess = require('../../data-access');
const makeCreateCompanyUseCase = require('./create_company');
const makeUpdateCompanyUseCase = require('./update_company');
const makeCompanyExistUseCase = require('./company_exists');
const makeCompanyExistsByNameUseCase = require('./company_exists_by_name');
const makeDeleteCompanyUseCase=require('./delete_company');
const makeGetCompanyIdByCompanyNameUseCase=require('./find_id_by_company_name');
const makeGetCompanyNameByCompanyIdUseCase=require('./get_company_name_by_company_id');
const makeGetAllCompanyUseCase = require('./get_all_companies');

const createCreateCompanyFunction=makeCreateCompanyUseCase({
    Joi,
    companyDB:dataAccess.companyDB,
})

const createUpdateCompanyFunction=makeUpdateCompanyUseCase({
    Joi,
    companyDB:dataAccess.companyDB,
})

const createCompanyExistsCompanyFunction=makeCompanyExistUseCase({
    Joi,
    companyDB:dataAccess.companyDB,
})

const createCompanyExistsByNameCompanyFunction=makeCompanyExistsByNameUseCase({
    Joi,
    companyDB:dataAccess.companyDB,
})


const createDeleteCompanyFunction = makeDeleteCompanyUseCase({
    Joi,
    companyDB:dataAccess.companyDB,
});

const createGetCompanyIdByCompanyNameFunction = makeGetCompanyIdByCompanyNameUseCase({
    Joi,
    companyDB:dataAccess.companyDB,
});

const createGetCompanyNameByCompanyIdFunction = makeGetCompanyNameByCompanyIdUseCase({
    Joi,
    companyDB:dataAccess.companyDB,
});

const createGetAllCompanyFunction = makeGetAllCompanyUseCase({
    Joi,
    companyDB:dataAccess.companyDB,
});

module.exports = Object.freeze({
    createCreateCompanyFunction,
    createUpdateCompanyFunction,
    createCompanyExistsCompanyFunction,
    createDeleteCompanyFunction,
    createGetCompanyIdByCompanyNameFunction,
    createCompanyExistsByNameCompanyFunction,
    createGetCompanyNameByCompanyIdFunction,
    createGetAllCompanyFunction,
});