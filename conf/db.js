const env = process.env.NODE_ENV;

let MYSQL_CONF;
let REDIS_CONF;

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "express_blog",
    port: "3306"
  };
  REDIS_CONF = {
    host: 'localhost',
    port: '6379'
  };
} else if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "express_blog",
    port: "3306"
  };
  REDIS_CONF = {
    host: 'localhost',
    port: '6379'
  };
}

module.exports = { MYSQL_CONF, REDIS_CONF };
