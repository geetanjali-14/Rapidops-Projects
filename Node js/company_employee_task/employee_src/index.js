const express = require("express");
const app = express();
const router = require("./rest-services");
const port = 8051;

const { Sequelize } = require("sequelize");

const config = require("./config/backend-config/config.json");

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
  }
);

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
