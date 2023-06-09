const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Joi = require("joi");
const dataAccess = require("../../data-access");

const makeGenerateAccessTokenUseCase = require("./generate_access_token");
const createGenerateAccessTokenUseCase = makeGenerateAccessTokenUseCase({
  Joi,
  crypto,
  jwt,
});

const makeInsertAccessTokenUseCase = require("./insert_access_token");
const createInsertAccessTokenUseCase = makeInsertAccessTokenUseCase({
  Joi,
  accessTokensDB: dataAccess.accessTokensDB,
});

const makeAccessTokenExistsUseCase = require("./access_token_exists");
const createAccessTokenExistsUseCase = makeAccessTokenExistsUseCase({
  Joi,
  accessTokensDB: dataAccess.accessTokensDB,
});

const makeUpdateAccessTokenUseCase = require("./update_access_token");
const createUpdateAccessTokenUseCase = makeUpdateAccessTokenUseCase({
  Joi,
  accessTokensDB: dataAccess.accessTokensDB,
});

const makeGetAccessTokenExpirationTimeUseCase=require('./fetch_access_token_expiration_time')
const createGetAccessTokenExpirationTimeUseCase = makeGetAccessTokenExpirationTimeUseCase({
  Joi,
  accessTokensDB: dataAccess.accessTokensDB,
});
module.exports = Object.freeze({
    createGenerateAccessTokenUseCase,
    createInsertAccessTokenUseCase,
    createAccessTokenExistsUseCase,
    createUpdateAccessTokenUseCase,
    createGetAccessTokenExpirationTimeUseCase,
  });