const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeDeleteRolesOfDeletedCompany = require("./delete-roles-of-deleted-company");

const sandbox = sinon.createSandbox();

const rolesDB = {
    deleteRolesOfDeletedCompany: ()=>{},
};

const deleteRolesOfDeletedCompanyStub = sandbox.stub(rolesDB, "deleteRolesOfDeletedCompany");
deleteRolesOfDeletedCompanyStub.callsFake( (args)=> {
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
  'Company details companyId: {string} to delete role',
   (companyId)=> {
    this.companyId = companyId || undefined;
  }
);

When("Try to delete role when its company is deleted", async  ()=> {
    const deleteRolesOfDeletedCompany = makeDeleteRolesOfDeletedCompany({
      Joi,
      rolesDB,
      ValidationError: exceptions.ValidationError,
    });
  
    try {
      
      this.result = await deleteRolesOfDeletedCompany({
        companyId: this.companyId,
      });
    } catch (error) {
      this.error = {
        name: error.name,
        message: error.message,
      };
    }
  });
  
  

Then(
    'It will throw error: {string} with message: "{string}" while trying to delete role when its company is deleted',
    (error, message)=> {
        console.log("This",this)
      expect(this.error).deep.equal({
        name: error,
        message: message,
      });
    }
  );
  

Then('It will delete role when its company is deleted with details: {int}',  (deletedRoleDetails)=> {
  expect(this.result).deep.equal(deletedRoleDetails);
});

Then(
  'deleteRole function will be called {int} times while trying to delete role when its company is deleted',
  (deleteRolesOfDeletedCompanyFunctionCallCount)=> {
    sinon.assert.callCount(employeeDB.deleteRolesOfDeletedCompany, deleteRolesOfDeletedCompanyFunctionCallCount);
  }
);
