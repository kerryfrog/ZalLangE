import express from "express";
import passport from "passport";
import logger from 'morgan';

// Router 정의
var userRouter = require('../routes/users');
var authRouter = require('../routes/auth');
var myaccountRouter = require('../routes/myaccount');
var testRouter = require("../routes/test");
var roomRouter = require('../routes/room');
const app = express();

require('../boot/db')();
require('../boot/auth')(); // 인증

//views의 엔진 설정
app.set('view engine', "pug");
app.set("views", __dirname + "/views"); // Pug위치

// user에게 public folder를 사용가능하게 제공 /public 이동시 public폴더를 볼 수있음 
//express.static : express의 정적 파일 제공
app.use("/public", express.static(__dirname + "/public"));

//미들웨어
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // post시 정보를 빼서 쓸수잇음
//app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat', resave: false, saveUninitialized: false
}));
app.use(passport.initialize());
app.use(function (req, res, next) {
  console.log("middleware function");
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});
app.use(passport.authenticate('session'));

//home 경로 지정 
app.get("/", (req, res) => res.render("home", { user: req.user }));

//router 연결
//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑
//express에서 라우팅 == 클라이언트로부터 요청받은 URL과 뷰를 매칭
//사전적인 의미 그대로 특정한 URL에 대해 특정한 뷰로 연결
app.use('/', authRouter);
app.use('/myaccount', myaccountRouter);
app.use('/users', userRouter);
app.use('/test', testRouter);
app.use('/room', roomRouter);

//서버 생성
const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);