const express = require("express");
const router = express.Router();
const { SuccessModel, ErrorModel } = require("../model/resModel");
const login = require("../controller/user");

router.post("/login", (req, res, next) => {
  // test
  // req.body = req.query;
  
  const result = login(req.body);
  result.then(params => {
    let userData;
    if (params) {
      userData = new SuccessModel(params);
      // console.log("params :) ", params);

      req.session.userName = params.username;
    } else {
      userData = new ErrorModel("User not found!");
    }
    res.json(userData);
  });
});

// router.get("/logged-test", (req, res, next) => {
//   if (req.session.userName) {
//     res.json("登录成功");
//   } else {
//     res.json("登录失败");
//   }
// });

// router.get("/session-test", (req, res, next) => {
//   const session = req.session;
//   console.log('session :) ', session);

//   if (session.viewNum === undefined) {
//     session.viewNum = 0;
//   }
//   session.viewNum++;
//   res.json({
//     viewNum: session.viewNum
//   });
// });

module.exports = router;
