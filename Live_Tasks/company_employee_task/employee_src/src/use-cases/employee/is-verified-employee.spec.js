const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeIsVerifiedEmployee = require("./is-verified-employee");

const sandbox = sinon.createSandbox();

const employeeDB = {
  isVerifiedEmployee: ()=>{},
};

const isVerifiedEmployeeStub = sandbox.stub(
  employeeDB,
  "isVerifiedEmployee"
);
isVerifiedEmployeeStub.callsFake((args) =>{
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });

  return 1;
});

After(()=> {
  this.employeeId = undefined;
  sandbox.resetHistory();
});

Given(
    'Employee details employeeId: {string} to check employee verification',
     (employeeId)=> {
      this.employeeId = employeeId || undefined;
    }
  );

  When("Try to check employee verification", async  ()=> {
    const isVerifiedEmployee = makeIsVerifiedEmployee({
      Joi,
      employeeDB,
      ValidationError:exceptions.ValidationError,
    });

    try {
      this.result = await isVerifiedEmployee({
        employeeId: this.employeeId,
      });
    } catch (error) {
      this.error = {
        name: error.name,
        message: error.message,
      };
    }
  });
  
  Then(
    'It will throw error: {string} with message: "{string}" while try to check employee verification',
     (error, message)=> {
      expect(this.error).deep.equal({
        name: error,
        message: message,
      });
    }
  );
  
  Then('It will check employee verification with details: {int}',  (verificationDetails)=> {
    expect(this.result).deep.equal(JSON.parse(verificationDetails));
  });
  
  Then(
    'isVerifiedEmployee function will call {int} time while try to to check employee verification',
     (isVerifiedEmployeeFunctionCallCount)=> {
      sinon.assert.callCount(isVerifiedEmployeeStub, isVerifiedEmployeeFunctionCallCount);
    }
  );