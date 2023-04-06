const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeDefaultFolderUseCase=require('./default-folders');

const sandbox = sinon.createSandbox();

const foldersDb = {
    defaultFolders: () => {},
};

const defaultFoldersStub = sandbox.stub(foldersDb, "defaultFolders");
defaultFoldersStub.callsFake((args) => {
  expect(args).deep.equal({
    id:this.id
  });
  return 1;
});

After(() => {
    this.id = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });
  
  Given(
    "Folder details id: {string} to create folder",
    (id) => {
      this.id = id || undefined;
    }
  );

  When("Try to create default folder", async () => {
    const defaultFolders = makeDefaultFolderUseCase({
      Joi,
      foldersDb,
    });
    try {
      this.result = await defaultFolders({
        id: this.id,
      });
    } catch (e) {
      this.error = {
        name: e.name,
        message: e.message,
      };
    }
  });

  Then(
    'It will throw error: {string} with message: {string} while creating default folders by id',
    (error, message) => {
      expect(this.error).deep.equal({
        name: error,
        message,
      });
    }
  );
  
  Then('It will get folder with details: {int}', (result) => {
    expect(this.result).deep.equal(JSON.parse(result));
  });
  
  Then('defaultFolders function will call {int} time while creating default folders',
      (defaultFolderFunctionCallCount) => {
        sinon.assert.callCount(defaultFoldersStub, defaultFolderFunctionCallCount);
      },
  );