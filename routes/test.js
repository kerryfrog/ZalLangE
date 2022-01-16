//그냥 이것저것 테스트 할 때 사용하셔요
var express = require('express');
var db = require('../lib/db');

var router = express.Router();

//query test
router.get('/', function(res, req, next){ 
    console.log(req);
    console.log(" ");   
    db.get('SELECT rowid AS id, * FROM users WHERE id = ?', [ req.user.id ], 
    function(err, row) {
        if (err) { return next(err); }
        console.log(row);
        res.send(row);
    });       
});

module.exports = router;
