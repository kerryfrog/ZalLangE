var express = require('express');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var db = require('../lib/db');

var router = express.Router();
//profile 부분을 정의 

/* GET users listing. */
router.get('/', ensureLoggedIn(),
  function (req, res, next) {
    // 해당 계정이 가지고 있는 img src 불러오기 
    db.all("SELECT image_src FROM images WHERE owner=?", //all method: 디비에서 모든 결과를 불러옴
      [req.user.id],
      function (err, rows) {
        if (err) { return next(err); }
        res.render('profile.ejs', {
          user: req.user,
          src_row:rows
        });

      } //end function(err , row )
    ) // end db.get     
  }); //end router.get

module.exports = router;