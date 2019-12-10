const { exec } = require("../db/mysql");

function readList(userName) {
  let sql = `select id, title, content, create_time from blogs  where author='${userName}'  `;

  sql += "order by create_time DESC";
  console.log('sql :) ', sql);
  
  return exec(sql);
}

function readDetail(id) {
  const sql = `select id, title, content, create_time, author from blogs where id=${id}`;
  return exec(sql).then(params => {
    return params[0];
  });
}

function updateBlog(body) {
  const { title, content, id } = body;
  const sql = `update blogs set title = '${title}', content = '${content}' where id=${id}`;
console.log('sql :) ', sql);

  return exec(sql);
}

function deleteBlog(id) {
  const sql = `delete from blogs where id = ${id}`;
  return exec(sql);
}

function createBlog(body, session) {
  const { title, content } = body;
  const create_time = Date.now();
  const author = session.userName;
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
