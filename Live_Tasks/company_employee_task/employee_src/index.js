const express = require("express");
const app = express();
const router = require("./rest-services");
const port = 8053;
const device = require("express-device");
const useragent = require("express-useragent");

const { Sequelize } = require("sequelize");
const config = require("./src/config/service-config/index");
const developmentConfig = config.serviceConfig.development; 

const sequelize = new Sequelize(
  developmentConfig.database,
  developmentConfig.username,
  developmentConfig.password,
  {
    dialect: developmentConfig.dialect,
    host: developmentConfig.host,
    port: developmentConfig.port,
    dialectOptions: developmentConfig.dialectOptions,
  }
);

const { Umzug, SequelizeStorage } = require("umzug");

const umzug = new Umzug({
  migrations: { glob: "./src/migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  await umzug.up();
})();

app.use(express.json());
app.use(device.capture());
app.use(useragent.express());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listening at http://localhost:${port}`);
  }
});
