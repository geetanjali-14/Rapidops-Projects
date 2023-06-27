const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeDeleteEmployeeOfDeletedCompany = require("./delete-employee-when-company-is-deleted");

const sandbox = sinon.createSandbox();

const employeeDB = {
  deleteEmployeeOfDeletedCompany: ()=>{},
};

const deleteEmployeeOfDeletedCompanyStub = sandbox.stub(employeeDB, "deleteEmployeeOfDeletedCompany");
deleteEmployeeOfDeletedCompanyStub.callsFake( (args)=> {
  expect(args).deep.equal({
    companyId: this.companyId,
  });
  return 1;
});


After( ()=> {
  this.companyId = undefined;
  sandbox.resetHistory();
});

Given(
  'Employee details companyId: {string} to delete employee when company is deleted',
   (companyId)=> {
    this.companyId = companyId || undefined;
  }
);

When("Try to delete employee when company is deleted", async  ()=> {
    const deleteEmployeeOfDeletedCompany = makeDeleteEmployeeOfDeletedCompany({
      Joi,
      employeeDB,
      ValidationError: exceptions.ValidationError,
    });
  
    try {
      
      this.result = await deleteEmployeeOfDeletedCompany({
        companyId: this.companyId,
      });
      console.log("Result", this.result);
    } catch (error) {
      this.error = {
        name: error.name,
        message: error.message,
      };
    }
  });
  
  

Then(
    'It will throw error: {string} with message: "{string}" while trying to delete employee when company is deleted',
    (error, message)=> {
      expect(this.error).deep.equal({
        name: error,
        message: message,
      });
    }
  );
  

Then('It will delete employee when company is deleted with details: {int}',  (deletedEmployeeDetails)=> {
  expect(this.result).deep.equal(deletedEmployeeDetails);
});

Then(
  'deleteEmployeeOfDeletedCompany function will be called {int} times while trying to delete an employee when the company is deleted',
  (deleteEmployeeOfDeletedCompanyFunctionCallCount)=> {
    sinon.assert.callCount(employeeDB.deleteEmployeeOfDeletedCompany, deleteEmployeeOfDeletedCompanyFunctionCallCount);
  }
);
