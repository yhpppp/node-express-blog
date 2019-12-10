const express = require("express");
const router = express.Router();
const { SuccessModel } = require("../model/resModel");
const {
  readList,
  readDetail,
  updateBlog,
  deleteBlog,
  createBlog
} = require("../controller/blog");

router.get("/list", (req, res, next) => {
  console.log('req.session :) ', req.session);
  
  const result = readList();
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

router.post("/update", (req, res, next) => {
  const result = updateBlog(req.body);
  result.then(packet => {
    res.json(new SuccessModel(packet.affectedRows, "updated"));
  });
});

router.post("/delete", (req, res, next) => {
  const result = deleteBlog(req.body.id);
  result.then(packet => {
    res.json(new SuccessModel(packet.affectedRows, "deleted"));
  });
});

router.post("/create", (req, res, next) => {
  const result = createBlog(req.body);
  result.then(packet => {
    res.json(new SuccessModel(packet.affectedRows, "created"));
  });
});
module.exports = router;
