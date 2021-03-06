var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const redisClient = require('./db/redis')
const RedisStore = require('connect-redis')(session)
const fs = require('fs')



var blogRouter = require("./routes/blog");
var userRouter = require("./routes/user");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// log
if(process.env.NODE_ENV === 'dev'){
  app.use(logger("dev"));
}else {
  const logFilePath = path.join(__dirname,'logs','access.log')
  const inputStream = fs.createWriteStream(logFilePath,{
    flags:'a'
  })
  app.use(logger("combined",{
    stream:inputStream
  }))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// session to redis
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(
  session({
    secret: "abc_123",
    cookie: {
      path: "/",  // default conf
      httpOnly: true,   // default conf
      maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore // 设置store session存入redis
  })
);

app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
