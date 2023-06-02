const config = {
    development: {
      username: "geetanjali@localhost",
      password: "Geetanjali-14",
      database: "employee",
      host: "127.0.0.1",
      dialect: "mysql",
      port:3306,
    },
    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mysql",
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql",
    },
  };
  
  module.exports = config;
  