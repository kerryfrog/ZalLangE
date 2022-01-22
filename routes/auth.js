var express = require('express');
var passport = require('passport');

var router = express.Router();

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('login.html');
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});
//모듈에 등록해야 server.js에서 app.use 함수를 통해서 사용 가능
module.exports = router;
