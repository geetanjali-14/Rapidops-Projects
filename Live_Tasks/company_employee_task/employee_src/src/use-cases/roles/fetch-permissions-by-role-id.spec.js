const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makefetchPermissionsByRoleId = require("./delete-role");

const sandbox = sinon.createSandbox();

const rolesDB = {
    fetchPermissionsByRoleId: ()=>{},
};

const fetchPermissionsByRoleIdStub = sandbox.stub(rolesDB, "fetchPermissionsByRoleId");
fetchPermissionsByRoleIdStub.callsFake( (args)=> {
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
  'Employee details roleId: {string} to fetch permissions',
   (roleId)=> {
    this.roleId = roleId || undefined;
  }
);

When("Try to fetch permissions", async  ()=> {
    const fetchPermissionsByRoleId = makefetchPermissionsByRoleId({
      Joi,
      rolesDB,
      ValidationError: exceptions.ValidationError,
    });
  
    try {
      
      this.result = await fetchPermissionsByRoleId({
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
    'It will throw error: {string} with message: "{string}" while trying to fetch permissions',
    (error, message)=> {
        console.log("This",this)
      expect(this.error).deep.equal({
        name: error,
        message: message,
      });
    }
  );
  

Then('It will fetch permissions with details: {string}',  (fetchedRoles)=> {
  expect(this.result).deep.equal(fetchedRoles);
});

Then(
  'fetchPermissionsByRoleId function will be called {int} times while trying to fetch permissions',
  (fetchPermissionsByRoleIdFunctionCallCount)=> {
    sinon.assert.callCount(employeeDB.fetchPermissionsByRoleId, fetchPermissionsByRoleIdFunctionCallCount);
  }
);
