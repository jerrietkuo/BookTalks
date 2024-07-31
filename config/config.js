module.exports = {
    "development": {
      "username": "postgres",
      "password": "jk811002",
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "dialect": "postgres"
    },
    "test": {
      "username": "postgres",
      "password": "j811002",
      "database": "booktalks_test_db",
      "host": "127.0.0.1",
      "port": 5433,
      "dialect": "postgres"
    },
    "production": {
      "username": "postgres",
      "password": "jk811002",
      "database": "booktalks_prod_db",
      "host": "127.0.0.1",
      "port": 5433,
      "dialect": "postgres"
    }
};