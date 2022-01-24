var db = require('../lib/db');

module.exports = function () {
  db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS users ( \
      id TEXT UNIQUE, \
      hashed_password BLOB, \
      salt BLOB, \
      nickname TEXT \
    )");
  });
  db.run("CREATE TABLE IF NOT EXISTS images(\
      image_src TEXT, \
      owner INTEGER \
      )");
  //db.close();
};
