var express = require('express');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var db = require('../lib/db');

var router = express.Router();

/* GET users listing. */
router.get('/',
  ensureLoggedIn(),
  function(req, res, next) {
    console.log("req.user.id", req.user.id);
    db.get('SELECT rowid AS id, nickname FROM users WHERE rowid = ?', [ req.user.id ], function(err, row) {
      if (err) { return next(err); }
      console.log(row);
      // TODO: Handle undefined row.
      var user = {
        id: row.id.toString(),
        nickname: row.nickname
      };
      // 변경해주기 
      
      res.render('profile', {
        nickname: user.nickname
      });
    });
  });

module.exports = router;
