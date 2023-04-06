// console.log("rest -services")
const express = require("express");
const controllers = require("./controllers");
const router = express.Router();
function init() {
  initUserRoutes();
  initFolderRoutes();
}

function initUserRoutes() {
  router.get("/users", controllers.userControllers.createShowUserController);

  router.post("/users", controllers.userControllers.createCreateuserController);

  router.put("/users/:id",controllers.userControllers.createUpdateuserController);

  router.get("/users/userById/:id",controllers.userControllers.createGetuserByIdController);

  router.delete("/users/:id",controllers.userControllers.createDeleteuserController);
}

function initFolderRoutes() {
  router.post("/folder",controllers.folderControllers.createCreatefolderController);

  router.put("/folder/:folder_id",controllers.folderControllers.createUpdatefolderController);

  router.delete("/folder/:id",controllers.folderControllers.createDeletefolderController);

  router.get("/folders/foldersByUserId/:id",controllers.folderControllers.createGetfolderByIdController);
}
init();
module.exports = router;
