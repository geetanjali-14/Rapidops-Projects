const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeDeleteRole = require("./delete-role");

const sandbox = sinon.createSandbox();

const rolesDB = {
    deleteRole: ()=>{},
};

const deleteRoleStub = sandbox.stub(rolesDB, "deleteRole");
deleteRoleStub.callsFake( (args)=> {
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
  'Employee details roleId: {string} to delete role',
   (roleId)=> {
    this.roleId = roleId || undefined;
  }
);

When("Try to delete role", async  ()=> {
    const deleteRole = makeDeleteRole({
      Joi,
      rolesDB,
      ValidationError: exceptions.ValidationError,
    });
  
    try {
      
      this.result = await deleteRole({
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
    'It will throw error: {string} with message: "{string}" while trying to delete role',
    (error, message)=> {
        console.log("This",this)
      expect(this.error).deep.equal({
        name: error,
        message: message,
      });
    }
  );
  

Then('It will delete role with details: {int}',  (deletedRoleDetails)=> {
  expect(this.result).deep.equal(deletedRoleDetails);
});

Then(
  'deleteRole function will be called {int} times while trying to delete role',
  (deleteRoleFunctionCallCount)=> {
    sinon.assert.callCount(employeeDB.deleteRole, deleteRoleFunctionCallCount);
  }
);
