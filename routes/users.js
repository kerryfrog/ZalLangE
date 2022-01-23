// 계정 생성 code 
var express = require('express');
var crypto = require('crypto');
var db = require('../lib/db');

var router = express.Router();

router.get('/new', function(req,res,next){
    res.render("signup.html");
});

router.post('/', function(req, res, next) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }
      db.run('INSERT INTO users (id, hashed_password, salt, nickname) VALUES (?, ?, ?, ?)', [
        req.body.id,
        hashedPassword,
        salt,
        req.body.nickname
      ], 
      function(err) {
        if (err) { return next(err); }
        var user = {
          id: this.lastID.toString(),
          username: req.body.username,
          displayName: req.body.name
        };
        req.login(user, function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      });
    });
  });

module.exports = router;
/* 
회원가입 후 바로 로그인 안되는 오류 발생 
이유는 추정하건데 .. 

*/