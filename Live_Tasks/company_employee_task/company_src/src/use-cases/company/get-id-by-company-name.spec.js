const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeGetCompanyIdByCompanyName = require("./get-id-by-company-name");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const companyDB = {
    findIdByCompanyName: () => {},
};

const functionsToMock = {
  createCompanyExistByName: () => {},
};

const findIdByCompanyNameStub = sandbox.stub(companyDB, "findIdByCompanyName");
findIdByCompanyNameStub.callsFake( (args)=>{
  expect(args).deep.equal({
    companyName: this.companyName,
  });
  return 1;
});

const createCompanyExistByNameStub = sandbox.stub(
  functionsToMock,
  "createCompanyExistByName"
  );
  createCompanyExistByNameStub.callsFake((args) => {
    expect(args).deep.equal({
      companyName: this.companyName,
    });
    return 1;
  });
  
  After( ()=> {
    this.companyName = undefined;
    this.result = undefined;
    this.error = undefined;
    
    sandbox.resetHistory();
  });

  Given(
    "Company details companyName: {string} while fetching company id by company name",
    (companyName)=> {
      this.companyName = companyName || undefined;
    }
    );
    
    Given("Company Exists by Name: {int}", (companyExistsResult) => {
      this.companyExistsResult = companyExistsResult;
    });
    
    When("Try to fetch company id by company name", async ()=> {
      const findIdByCompanyName = makeGetCompanyIdByCompanyName({
        Joi,
        companyDB,
        createCompanyExistByName: functionsToMock.createCompanyExistByName,
        ValidationError: exceptions.ValidationError,
        ForbiddenError: exceptions.ForbiddenError,
      });
      try {
        console.log("**********",this)
        this.result = await findIdByCompanyName({
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
  'It will throw error: {string} with message: "{string}" while fetching company id by company name',
   (error, message)=> {
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  'It will get company ID: {int}',
  (companyId) =>{
    expect(this.result).deep.equal(companyId);
  }
);

Then(
  "createCompanyExistByName function will call {int} time while fetching company id by company name",
  (createCompanyExistByNameFunctionCallCount) =>{
    sinon.assert.callCount(createCompanyExistByNameStub, createCompanyExistByNameFunctionCallCount);
  }
);

Then(
  "findIdByCompanyName function will call {int} time while fetching company id by company name",
  (findIdByCompanyNameFunctionCallCount) => {
    sinon.assert.callCount(
        findIdByCompanyNameStub,
        findIdByCompanyNameFunctionCallCount
    );
  }
);
