const express = require('express');
const app = express();
const router = require('./rest-services')
const port=8050;

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("company", "geetanjali@localhost", "Geetanjali-14", {
  dialect: "mysql",
  host: "localhost",
  port: 8050,
});

const { Umzug, SequelizeStorage } = require("umzug");
const umzug = new Umzug({
  migrations: { glob: "../../migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  await umzug.up();
})();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listening at http://localhost:${port}`);
  }
});