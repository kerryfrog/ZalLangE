var express = require('express');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var db = require('../lib/db');

var router = express.Router();
//profile 부분을 정의 

/* GET users listing. */
router.get('/', ensureLoggedIn(),
  function (req, res, next) {
    // 해당 계정이 가지고 있는 img src 불러오기 
    db.get("SELECT image_src FROM images WHERE owner=?",
      [req.user.id],
      function (err, row) {
        if (err) { return next(err); }
        console.log("query answer is :", row);
        res.render('profile.html', {
          user: req.user,
          src_row: row
        });
      } //end function(err , row )

    ) // end db.get     
  }); //end router.get

module.exports = router;