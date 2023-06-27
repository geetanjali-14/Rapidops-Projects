const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeFetchEmployeeRoles = require("./fetch-employee-roles");

const sandbox = sinon.createSandbox();

const employeeRolesDB = {
  fetchEmployeeRole: ()=>{},
};

const fetchEmployeeRoleStub = sandbox.stub(employeeRolesDB, "fetchEmployeeRole");
fetchEmployeeRoleStub.callsFake( (args)=> {
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });
  return 1;
});


After( ()=> {
  this.employeeId = undefined;
  sandbox.resetHistory();
});

Given(
  'Employee details role: "{string}" to fetch employee roles',
   (employeeId)=> {
    this.employeeId = employeeId || undefined;
  }
);

When("Try to fetch employee roles", async  ()=> {
    const fetchEmployeeRole = makeFetchEmployeeRoles({
      Joi,
      employeeRolesDB,
      ValidationError: exceptions.ValidationError,
      InvalidAccessError:exceptions.InvalidAccessError
    });
  
    try {
      
      this.result = await fetchEmployeeRole({
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
    'It will throw error: {string} with message: "{string}" while trying to fetch employee roles',
    (error, message)=> {
        console.log("This",this)
      expect(this.error).deep.equal({
        name: error,
        message: message,
      });
    }
  );
  

Then('It will fetch employee roles with details: {int}',  (fetchedRole)=> {
  expect(this.result).deep.equal(fetchedRole);
});

Then(
  'fetchEmployeeRole function will be called {int} times while trying to fetch employee roles',
  (fetchEmployeeRoleFunctionCallCount)=> {
    sinon.assert.callCount(employeeDB.fetchEmployeeRole, fetchEmployeeRoleFunctionCallCount);
  }
);
