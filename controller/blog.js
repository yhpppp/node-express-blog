const {exec} = require("../db/mysql");

function readList() {
  return exec(
    "select title, content, create_time, author from blogs order by create_time DESC"
  );
}

function readDetail(id) {
  const sql = `select title, content, create_time, author from blogs where id=${id}`;
  return exec(sql);
}

function updateBlog(body) {
  const { title, content, id } = body;
  const sql = `update blogs set title = '${title}', content = '${content}' where id=${id}`;

  return exec(sql);
}

function deleteBlog(id) {
  const sql = `delete from blogs where id = ${id}`;
  return exec(sql);
}

function createBlog(body) {
  const { title, content } = body;
  const create_time = Date.now();
  const author = "whh";
  const sql = `insert into blogs (title,content,create_time,author) values ('${title}', '${content}', ${create_time}, '${author}');`;

  return exec(sql);
}

module.exports = {
  readList,
  readDetail,
  updateBlog,
  deleteBlog,
  createBlog
};
