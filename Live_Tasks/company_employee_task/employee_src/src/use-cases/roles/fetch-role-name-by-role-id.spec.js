const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makefetchRoleNameByRoleId = require("./fetch-role-name-by-role-id");

const sandbox = sinon.createSandbox();

const rolesDB = {
    fetchRoleNameByRoleId: ()=>{},
};

const fetchRoleNameByRoleIdStub = sandbox.stub(rolesDB, "fetchRoleNameByRoleId");
fetchRoleNameByRoleIdStub.callsFake( (args)=> {
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
  'Employee details role: {string} to fetch role name',
   (roleId)=> {
    this.roleId = roleId || undefined;
  }
);

When("Try to fetch role name", async  ()=> {
    const fetchRoleNameByRoleId = makefetchRoleNameByRoleId({
      Joi,
      rolesDB,
      ValidationError: exceptions.ValidationError,
    });
  
    try {
      
      this.result = await fetchRoleNameByRoleId({
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
    'It will throw error: {string} with message: "{string}" while trying to fetch role name',
    (error, message)=> {
        console.log("This",this)
      expect(this.error).deep.equal({
        name: error,
        message: message,
      });
    }
  );
  

Then('It will fetch role name with details: {int}',  (fetchedName)=> {
  expect(this.result).deep.equal(fetchedName);
});

Then(
  'fetchRoleNameByRoleId function will be called {int} times while trying to fetch role name',
  (fetchRoleNameByRoleIdFunctionCallCount)=> {
    sinon.assert.callCount(employeeDB.fetchRoleNameByRoleId, fetchRoleNameByRoleIdFunctionCallCount);
  }
);
