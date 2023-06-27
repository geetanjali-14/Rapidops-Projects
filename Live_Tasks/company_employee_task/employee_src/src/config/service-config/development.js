const config={
    "development": {
      "username": "employee_user",
      "password": "employee_pwd",
      "database": "employee",
      "host": "127.0.0.1",
      "dialect": "postgres",
      "port":26257,
      "dialectOptions": {
        "ssl": {
          "rejectUnauthorized": false
        }
      }
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  module.exports=config;