const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
 
const sequelize = new Sequelize("migration_db","geetanjali@localhost","Geetanjali-14",{ dialect: 'mysql'});
 
const umzug = new Umzug({
  migrations: { glob: './migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

umzug.up().then(()=>{
  console.log("All migration are updated");
}).catch((err) => {
  console.log(`Err ${err}`);
});
