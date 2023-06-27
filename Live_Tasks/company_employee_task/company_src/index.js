const express = require("express");
const app = express();
const router = require("./rest-services");
const port = 8050;

const { Sequelize } = require("sequelize");

const config = require("./src/config/service-config");
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    port: dbConfig.port,
    dialectOptions: dbConfig.dialectOptions,
  },
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
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listening at http://localhost:${port}`);
  }
});
