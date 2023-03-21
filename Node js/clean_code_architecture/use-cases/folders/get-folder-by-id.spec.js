const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeGetFolderByIdUseCase = require("./get-folders-by-id");

const sandbox = sinon.createSandbox();

const foldersDb = {
    getFolderById: () => {},
};

const getFolderByIdStub = sandbox.stub(foldersDb, "getFolderById");
getFolderByIdStub.callsFake((args) => {
  expect(args).deep.equal({
    id:this.id
  });
  return {"id":1}
});

After(() => {
    this.id=undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });
  
  Given(
    'Folder details id: {string} to get folder details',
    (id) => {
      this.id = id || undefined;
    }
  );

  When("Try to get folder details", async () => {
    const getFolderById = makeGetFolderByIdUseCase({
      Joi,
      foldersDb,
    });
    try {
      this.result = await getFolderById({
        id:this.id,
      });
    } catch (e) {
      this.error = {
        name: e.name,
        message: e.message,
      };
    }
  });

  Then(
    'It will throw error: {string} with message: "{string}" while getting folder by id',
    (error, message) => {
      expect(this.error).deep.equal({
        name: error,
        message,
      });
    }
  );
  
  Then('It will get folder with details: {string}', (folderDetails) => {
    expect(this.result).deep.equal(JSON.parse(folderDetails));
  });
  
  Then('getFolderById function will call {int} time while getting folder details',
      (getFolderByIdFunctionCallCount) => {
        sinon.assert.callCount(getFolderByIdStub, getFolderByIdFunctionCallCount);
      },
  );