const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makefetchRoleId = require("./fetch-role-id");

const sandbox = sinon.createSandbox();

const rolesDB = {
    fetchRoleId: ()=>{},
};

const fetchRoleIdStub = sandbox.stub(rolesDB, "fetchRoleId");
fetchRoleIdStub.callsFake( (args)=> {
  expect(args).deep.equal({
    roleId: this.roleId,
  });
  return 1;
});


After( ()=> {
  this.roleId = undefined;
  sandbox.resetHistory();
});

Given(
  'Employee details role: {string} to fetch id',
   (roleId)=> {
    this.roleId = roleId || undefined;
  }
);

When("Try to fetch id", async  ()=> {
    const fetchRoleId = makefetchRoleId({
      Joi,
      rolesDB,
      ValidationError: exceptions.ValidationError,
    });
  
    try {
      
      this.result = await fetchRoleId({
        roleId: this.roleId,
      });
    } catch (error) {
      this.error = {
        name: error.name,
        message: error.message,
      };
    }
  });
  
  

Then(
    'It will throw error: {string} with message: "{string}" while trying to fetch id',
    (error, message)=> {
        console.log("This",this)
      expect(this.error).deep.equal({
        name: error,
        message: message,
      });
    }
  );
  

Then('It will fetch id with details: {int}',  (fetchedId)=> {
  expect(this.result).deep.equal(fetchedId);
});

Then(
  'fetchRoleId function will be called {int} times while trying to fetch id',
  (fetchRoleIdFunctionCallCount)=> {
    sinon.assert.callCount(employeeDB.fetchRoleId, fetchRoleIdFunctionCallCount);
  }
);
