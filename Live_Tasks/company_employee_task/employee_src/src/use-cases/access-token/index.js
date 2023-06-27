const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Joi = require("joi");
const dataAccess = require("../../data-access");
const exceptions = require("../../exceptions");
const useCases=require('../../use-cases')
const { accessTokensDB } = require("../../data-access");

const makeGenerateAccessToken = require("./generate-access-token");
const createGenerateAccessToken = makeGenerateAccessToken({
  Joi,
  crypto,
  jwt,
  ValidationError: exceptions.ValidationError,
});
const makeAccessTokenExists = require("./access-token-exists");
const createAccessTokenExists = makeAccessTokenExists({
  Joi,
  accessTokensDB: dataAccess.accessTokensDB,
  ValidationError: exceptions.ValidationError,
});

const makeAccessTokenExistsByEmployeeId = require("./access-token-exists-by-employee-id");
const createAccessTokenExistsByEmployeeId = makeAccessTokenExistsByEmployeeId({
  Joi,
  accessTokensDB: dataAccess.accessTokensDB,
  ValidationError: exceptions.ValidationError,
});

const makeUpdateAccessToken = require("./update-access-token");
const createUpdateAccessToken = makeUpdateAccessToken({
  Joi,
  accessTokensDB: dataAccess.accessTokensDB,
  ValidationError: exceptions.ValidationError,
});

const makeGetAccessTokenExpirationTime=require('./fetch-access-token-expiration-time')
const createGetAccessTokenExpirationTime = makeGetAccessTokenExpirationTime({
  Joi,
  accessTokensDB: dataAccess.accessTokensDB,
  ValidationError: exceptions.ValidationError,
});

const makeFilterEmployee=require('./filter-employee')
const createFilterEmployee = makeFilterEmployee({
  Joi,
  accessTokensDB: dataAccess.accessTokensDB,
  ValidationError: exceptions.ValidationError,
});

const makeGetEmployeeIdFromAccessToken=require('./get-employee-id-from-access-token')
const createGetEmployeeIdFromAccessToken = makeGetEmployeeIdFromAccessToken({
  Joi,
  accessTokensDB: dataAccess.accessTokensDB,
  ValidationError: exceptions.ValidationError,
});

const makeInsertAccessToken = require("./insert-access-token");
const createInsertAccessToken = makeInsertAccessToken({
  Joi,
  accessTokensDB: dataAccess.accessTokensDB,
  ValidationError: exceptions.ValidationError,
  updateAccessToken:createUpdateAccessToken,
  accessTokenExistsByEmployeeId:accessTokensDB.accessTokenExistsByEployeeId,
});

module.exports = Object.freeze({
    createGenerateAccessToken,
    createInsertAccessToken,
    createAccessTokenExists,
    createUpdateAccessToken,
    createGetAccessTokenExpirationTime,
    createFilterEmployee,
    createGetEmployeeIdFromAccessToken,
    createAccessTokenExistsByEmployeeId
  });