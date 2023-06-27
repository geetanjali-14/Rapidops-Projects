const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeGetCompanyNameByCompanyId = require("./get-company-name-by-company-id");

const sandbox = sinon.createSandbox();

const employeeDB = {
    getCompanyByEmployee: ()=>{},
};

const getCompanyByEmployeeStub = sandbox.stub(
  employeeDB,
  "getCompanyByEmployee"
);
getCompanyByEmployeeStub.callsFake( (args) =>{
  expect(args).deep.equal({
    employeeEmail: this.employeeEmail,
  });

  return true;
});

After( () =>{
  this.employeeEmail = undefined;
  sandbox.restore();
});

Given(
    'Employee details employeeEmail: {string} to check employee email existence',
    (employeeEmail)=> {
      this.employeeEmail = employeeEmail || undefined;
    }
  );

  When("Try to check employee email existence", async  ()=> {
    const employeeEmailExists = makeGetCompanyNameByCompanyId({
      Joi,
      employeeDB,
      ValidationError:exceptions.ValidationError,
    });

    try {
      this.result = await employeeEmailExists({
        employeeEmail: this.employeeEmail,
      });
    } catch (error) {
      console.log(error)
      this.error = {
        name: error.name,
        message: error.message,
      };
    }
  });
  
  Then(
    'It will throw error: {string} with message: "{string}" while try to check employee email existence',
     (error, message) =>{
      expect(this.error).deep.equal({
        name: error,
        message: message,
      });
    }
  );
  
  Then('It will check employee email existence with details: {int}',  (employeeExistsResult)=> {
    const expected = { employeeEmail: employeeExistsResult };
    const actual = this.result;
    expect(actual).to.deep.equal(expected);
  });
  
  
  Then(
    'employeeEmailExists function will call {int} time while try to check employee email existence',
    (employeeEmailExistsFunctionCallCount)=> {
      sinon.assert.callCount(employeeEmailExistsStub, employeeEmailExistsFunctionCallCount);
    }
  );