const express = require("express");
const router = express.Router();
const { SuccessModel, ErrorModel } = require("../model/resModel");
const {
  readList,
  readDetail,
  updateBlog,
  deleteBlog,
  createBlog
} = require("../controller/blog");
const checkLogin = require("../middleware/checkLogin");

router.get("/list", (req, res, next) => {
  let name;
  if (req.query.isadmin) {
    if (req.session.userName) {
      name = req.session.userName;
    } else {
      res.json(new ErrorModel("你没登录!"));
      return;
    }
  }
  const result = readList(name);
  result.then(listdata => {
    res.json(new SuccessModel(listdata, "Get succeeded"));
  });
});

router.get("/detail", (req, res, next) => {
  const result = readDetail(req.query.id);
  result.then(detaildata => {
    res.json(new SuccessModel(detaildata, "detail data"));
  });
});

router.post("/update", checkLogin, (req, res, next) => {
  console.log("req.query.id :) ", req.query.id);

  req.body.id = req.query.id;
  console.log("req.body :) ", req.body);

  const result = updateBlog(req.body);
  result.then(packet => {
    res.json(new SuccessModel(packet.affectedRows, "updated"));
  });
});

router.post("/delete", checkLogin, (req, res, next) => {
  const result = deleteBlog(req.query.id);
  result.then(packet => {
    res.json(new SuccessModel(packet.affectedRows, "deleted"));
  });
});

router.post("/create", checkLogin, (req, res, next) => {
  const result = createBlog(req.body, (session = req.session));
  result.then(packet => {
    res.json(new SuccessModel(packet.affectedRows, "created"));
  });
});
module.exports = router;
