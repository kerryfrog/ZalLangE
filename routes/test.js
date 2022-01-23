//그냥 이것저것 테스트 할 때 사용하셔요
var express = require('express');

var router = express.Router();

//query test
router.get('/', function(req, res, next){
    res.render('test.html', {data :"somsom"});
});

module.exports = router;
