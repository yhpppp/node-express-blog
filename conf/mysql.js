const env = process.env.NODE_ENV;

let MYSQL_CONF;

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "express_blog",
    port: "3306"
  };
} else if (env === "production") {
  MYSQL_CONF = {};
}


module.exports = {MYSQL_CONF};
