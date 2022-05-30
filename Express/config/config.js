require("dotenv").config()

module.exports =
{
  "development": {
    "username": process.env.DB_USER_DEV,
    "password": process.env.DB_PASS_DEV,
    "database": process.env.DB_NAME_DEV,
    "host": process.env.DB_HOST_DEV,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USER_TEST,
    "password": process.env.DB_PASS_TEST,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST_TEST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER_PRODUCTION,
    "password": process.env.DB_PASS_PRODUCTION,
    "database": process.env.DB_NAME_PRODUCTION,
    "host": process.env.DB_HOST_PRODUCTION,
    "dialect": "mysql"
  }
}


