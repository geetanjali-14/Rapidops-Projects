const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeCreateCompany = require("./create-company");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const companyDB = {
  createCompany: () => {},
};

const functionsToMock = {
  createCompanyExistByName: () => {},
};

const createCompanyStub = sandbox.stub(companyDB, "createCompany");
createCompanyStub.callsFake((args)=> {
  expect(args).to.deep.equal({
    companyName: this.companyName,
    companyEmail: this.companyEmail,
    address: this.address,
  });
  return 1;
});

const createCompanyExistByNameStub = sandbox.stub(
  functionsToMock,
  "createCompanyExistByName"
);
createCompanyExistByNameStub.callsFake( (args)=> {
  expect(args).to.deep.equal({
    companyName: this.companyName,
  });
  return 0;
});

After(()=> {
  this.companyName = undefined;
  this.companyEmail = undefined;
  this.address = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  'Company details companyName: {string}, companyEmail: {string} and address:{string} to create company',
  (companyName, companyEmail, address) => {
    this.companyName = companyName || undefined;
    this.companyEmail = companyEmail || undefined;
    this.address = address || undefined;
  }
);

Given("Company Exists by Name gives result: {int}", (companyExistsResult) => {
  this.companyExistsResult = companyExistsResult;
});

When("Try to create company", async ()=> {
  const createCompany = makeCreateCompany({
    Joi,
    companyDB,
    createCompanyExistByName: functionsToMock.createCompanyExistByName,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });
  try {
  
    this.result = await createCompany({
      companyName: this.companyName,
      companyEmail: this.companyEmail,
      address: this.address,
    });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while creating company',
  (error, message) => {
    expect(this.error).to.deep.equal({
      name: error,
      message: message,
    });
  }
);

Then("It will create company with details: {int}", (newCompanyDetails) => {
  expect(this.result).to.deep.equal(JSON.parse(newCompanyDetails));
});

Then(
  "createCompanyExistByName function will call {int} time while creating company",
  (createCompanyExistByNameFunctionCallCount) => {
    sinon.assert.callCount(
      createCompanyExistByNameStub,
      createCompanyExistByNameFunctionCallCount
    );
  }
);

Then(
  "createCompany function will call {int} time while creating company",
  (createCompanyFunctionCallCount) => {
    sinon.assert.callCount(
      createCompanyStub,
      createCompanyFunctionCallCount
    );
  }
);
