const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeRoleExists = require("./role-exists");

const sandbox = sinon.createSandbox();

const rolesDB = {
    roleExists: ()=>{},
};

const roleExistsStub = sandbox.stub(rolesDB, "roleExists");
roleExistsStub.callsFake( (args)=> {
  expect(args).deep.equal({
    role: this.role,
  });
  return 1;
});


After( ()=> {
  this.role = undefined;
  sandbox.resetHistory();
});

Given(
  'Employee details role: "{string}" to check role existence',
   (role)=> {
    this.role = role || undefined;
  }
);

When("Try to check role existence", async  ()=> {
    const roleExists = makeRoleExists({
      Joi,
      rolesDB,
      ValidationError: exceptions.ValidationError,
    });
  
    try {
      
      this.result = await roleExists({
        role: this.role,
      });
    } catch (error) {
      this.error = {
        name: error.name,
        message: error.message,
      };
    }
  });
  
  

Then(
    'It will throw error: {string} with message: "{string}" while trying to check role existence',
    (error, message)=> {
        console.log("This",this)
      expect(this.error).deep.equal({
        name: error,
        message: message,
      });
    }
  );
  

Then('It will check role existence with details: {int}',  (fetchedName)=> {
  expect(this.result).deep.equal(fetchedName);
});

Then(
  'roleExists function will be called {int} times while trying to check role existence',
  (roleExistsFunctionCallCount)=> {
    sinon.assert.callCount(employeeDB.roleExists, roleExistsFunctionCallCount);
  }
);
