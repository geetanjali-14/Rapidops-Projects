const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeEmployeeEmailExists = require("./employee-email-exists");

const sandbox = sinon.createSandbox();

const employeeDB = {
    employeeEmailExists: ()=>{},
};

const employeeEmailExistsStub = sandbox.stub(
  employeeDB,
  "employeeEmailExists"
);
employeeEmailExistsStub.callsFake( (args) =>{
  console.log("#####",this)
  expect(args).deep.equal({
    employeeEmail: this.employeeEmail,
  });

  return 1;
});

After( ()=> {
  this.employeeEmail = undefined;
  sandbox.restore();
});

Given(
    'Employee details employeeEmail: {string} for checking employee email existence',
    (employeeEmail) =>{
      this.employeeEmail = employeeEmail || undefined;
    }
  );

  When("Try checking employee email existence", async  ()=> {
    const employeeEmailExists = makeEmployeeEmailExists({
      Joi,
      employeeDB,
      ValidationError:exceptions.ValidationError,
    });

    try {
      this.result = await employeeEmailExists({
        employeeEmail: this.employeeEmail,
      });
    } catch (error) {
      // console.log(error)
      this.error = {
        name: error.name,
        message: error.message,
      };
    }
  });
  
  Then(
    'It will throw error: {string} with message: "{string}" while try checking employee email existence',
    (error, message) =>{
      console.log("************",this);
      expect(this.error).deep.equal({
        name: error,
        message: message,
      });
    }
  );
  
  Then('It will check employee email existence with detail: {int}', (employeeExistsResult)=> {
    const expected = { employeeEmail: employeeExistsResult };
    const actual = this.result;
    expect(actual).to.deep.equal(expected);
  });
  
  
  Then(
    'employeeEmailExists function will call {int} time while trying to check employee email existence',
     (employeeEmailExistsFunctionCallCount) =>{
      sinon.assert.callCount(employeeEmailExistsStub, employeeEmailExistsFunctionCallCount);
    }
  );