var express = require('express');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var db = require('../lib/db');

var router = express.Router();

router.get('/',
  ensureLoggedIn(),
  function (req, res, next) {
    db.get('SELECT rowid AS rowid, nickname, id FROM users WHERE rowid = ?', [req.user.rowid],
      function (err, row) {
        if (err) { return next(err); }
        console.log(row);
        var user = {
          rowid: row.rowid.toString(),
          nickname: row.nickname,
          id: row.id
        };
        res.render('deal.html', {
          user: user
        });
      });
  });

module.exports = router;