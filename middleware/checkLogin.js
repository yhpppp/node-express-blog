const { ErrorModel } = require("../model/resModel");

module.exports = (req, res, next) => {
  if (req.session.userName) {
    next();
  } else {
    res.json(new ErrorModel("尚未登录!"));
  }
};
