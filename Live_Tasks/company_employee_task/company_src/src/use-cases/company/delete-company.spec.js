const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeDeleteCompany = require("./delete-company");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const companyDB = {
    deleteCompany: () => {},
};

const functionsToMock = {
  createCompanyExists: () => {},
};

const deleteCompanyStub = sandbox.stub(companyDB, "deleteCompany");
deleteCompanyStub.callsFake((args) =>{
  expect(args).deep.equal({
    companyId: this.companyId,
  });
  return 1;
});

const createCompanyExistsStub = sandbox.stub(
  functionsToMock,
  "createCompanyExists"
);
createCompanyExistsStub.callsFake((args) => {
  expect(args).deep.equal({
    companyId: this.companyId,
  });
  return 1;
});

After( ()=> {
  this.companyId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "Company details companyId: {string} to delete company",
  (companyId)=> {
    this.companyId = companyId || undefined;
  }
);

Given("Company Exists:{int}", (companyExistsResult) => {
  this.companyExistsResult = companyExistsResult;
});

When("Try to delete company", async () =>{
  const deleteCompany = makeDeleteCompany({
    Joi,
    companyDB,
    createCompanyExists: functionsToMock.createCompanyExists,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });
  try {
    this.result = await deleteCompany({
        companyId: this.companyId,
    });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while deleting company',
   (error, message)=> {
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  'It will throw error: {string} with message: "{string}" while deleting company when Forbidden error occurs',
   (error, message) =>{
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  'It will delete company with details: {int}',
   (deletedCompanyDetails)=> {
    expect(this.result).deep.equal(deletedCompanyDetails);
  }
);

Then(
  "createCompanyExist function will call {int} time while deleting company",
  (createCompanyExistFunctionCallCount)=> {
    console.log("***********",createCompanyExistFunctionCallCount)
    sinon.assert.callCount(createCompanyExistsStub, createCompanyExistFunctionCallCount);
  }
);

Then(
  "deleteCompany function will call {int} time while deleting company",
  (deleteCompanyFunctionCallCount) => {
    sinon.assert.callCount(
        deleteCompanyStub,
        deleteCompanyFunctionCallCount
    );
  }
);
