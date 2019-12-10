const { exec,escape } = require("../db/mysql");
function login(body) {
  let { username, password } = body;
  username = escape(username);
  password = escape(password);

  const sql = `select username from users where username=${username} and password=${password}`;

  return exec(sql).then(params => {
    const userOnly = params.length;
    if (userOnly === 0) {
      return false;
    } else {
      return params[0];
    }
  });
}

module.exports = login;
