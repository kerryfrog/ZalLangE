var express = require('express');
var db = require('../lib/db');
const multer  = require('multer')
const upload = multer({ dest: __dirname+'/../src/public/image' })

var router = express.Router();

//profile 에서 사진 업로드 처리 
router.post('/upload', upload.single('upload_photo'), function (req, res, next) {
    // req.files 는 `photos` 라는 파일정보를 배열로 가지고 있습니다.
    // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
    if(!req.file){
        console.log("No File upload");
    }
    else {
       // console.log(req.file.filename);
       // console.log(req.user);
        var imgsrc = 'http://127.0.0.1:3000/public/image/' + req.file.filename
        var insertData = "INSERT INTO images(image_src, owner) VALUES(?, ?)"
        db.run(insertData, [imgsrc, req.user.id], (err, result) => {
            if (err) throw err
            console.log("file uploaded");
        })
        //console.log(req.user);
        res.redirect("/myaccount");
    } 
}); //end router.post
module.exports = router;
