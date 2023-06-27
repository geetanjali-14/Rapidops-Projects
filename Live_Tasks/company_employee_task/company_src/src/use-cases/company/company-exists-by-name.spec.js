const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeCompanyExistByName = require("./company-exists-by-name");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const companyDB = {
    companyExistsByName: () => {},
};

const companyExistsByNameStub = sandbox.stub(companyDB, "companyExistsByName");
companyExistsByNameStub.callsFake((args) =>{
  expect(args).deep.equal({
    companyName: this.companyName,
  });
  return 1;
});


After(()=> {
  this.companyName = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "company details companyName: {string} to check company existence by name",
  (companyName) =>{
    this.companyName = companyName || undefined;
  }
)
When("Try to check company existence by name", async ()=> {
  const companyExistsByName = makeCompanyExistByName({
    Joi,
    companyDB,
    ValidationError: exceptions.ValidationError,
  });
  try {
    this.result = await companyExistsByName({
      companyName: this.companyName,
    });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while checking company existence by name',
   (error, message) =>{
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  'It will check company existence by name with details: {int}',
   (existsResult)=> {
    expect(this.result).deep.equal(JSON.parse(existsResult));
  }
);

Then(
  "companyExistsByName function will call {int} time while checking company existence by name",
  (companyExistsByNameFunctionCallCount)=> {
    sinon.assert.callCount(companyExistsByNameStub, companyExistsByNameFunctionCallCount);
  }
);