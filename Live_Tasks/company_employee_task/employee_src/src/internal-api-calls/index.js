const axios = require("axios");
const { serviceEndpoints } = require("../config");

const makeGetCompanyID = require("./get-company-id");
const createGetCompanyID = makeGetCompanyID({
  axios,
  serviceEndpoints,
});

const makeCompanyExists = require("./company-exists");
const createCompanyExists = makeCompanyExists({
  axios,
  serviceEndpoints,
});

const makeCompanyExistsById = require("./company-exists-by-id");
const createCompanyExistsById = makeCompanyExistsById({
  axios,
  serviceEndpoints,
});

const makeGetCompanyNameByCompanyID = require("./get-company-name");
const createMakeGetCompanyByCompanyID = makeGetCompanyNameByCompanyID({
  axios,
  serviceEndpoints,
});

const makeGetCompanyEmailByCompanyID = require("./get-company-email");
const createGetCompanyEmailByCompanyID = makeGetCompanyEmailByCompanyID({
  axios,
  serviceEndpoints,
});
module.exports = Object.freeze({
  createGetCompanyID,
  createCompanyExists,
  createCompanyExistsById,
  createMakeGetCompanyByCompanyID,
  createGetCompanyEmailByCompanyID,
});
