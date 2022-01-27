//그냥 이것저것 테스트 할 때 사용하셔요
var express = require('express');
var db = require('../lib/db');
var router = express.Router();

//query test
router.get('/', function(req, res, next){
    res.render('test.html', {data :"somsom"});
});
router.get('/sql',function(req, res, next) {
    //console.log(req.user);
    db.get('SELECT rowid AS rowid, nickname, id FROM users WHERE rowid = ?', [req.user.rowid] ,
    function (err, row) {
        if (err) { return next(err); }
        console.log(row);
        var user = {
          rowid: row.rowid.toString(),
          nickname: row.nickname,
          id: row.id
        };
        //console.log(typeof(user));
        res.send(row)
    });
});

module.exports = router;
