var express = require('express');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var db = require('../lib/db');

var router = express.Router();

/* GET users listing. */
router.get('/',
  ensureLoggedIn(),
  function(req, res, next) {
    db.get('SELECT rowid AS id, nickname FROM users WHERE rowid = ?', [ req.user.rowid ], 
    function(err, row) {
      if (err) { return next(err); }
      console.log( row);
      var user = {
        id: row.id.toString(),
        nickname: row.nickname
      };
      res.render('profile', {
       user:user
      });
    });
  });

module.exports = router;
