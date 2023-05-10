const express = require("express");
const app = express();
const router = require("./rest-service");
const port = 8085;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("email_client", "geetu", "geetu", {
  dialect: "postgres",
  host: "localhost",
  port: 26257,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const { Umzug, SequelizeStorage } = require("umzug");
const umzug = new Umzug({
  migrations: { glob: "./migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  await umzug.up();
})();

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listening at http://localhost:${port}/users`);
  }
});
