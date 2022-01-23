var express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
var router = express.Router();

app.post('/upload', upload.array('upload_photo'), function (req, res, next) {
    // req.files 는 `photos` 라는 파일정보를 배열로 가지고 있습니다.
    // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
  })


module.exports = router;
