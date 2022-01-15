import express from "express";
import passport from "passport";
import logger from 'morgan';

// Router 정의
var userRouter = require('../routes/users');
var authRouter = require('../routes/auth');
var myaccountRouter = require('../routes/myaccount');
const app =express();

require('../boot/db')();
require('../boot/auth')();

//views의 엔진 설정
app.set('view engine', "pug");
app.set("views",__dirname+ "/views");

var bodyParser =require('body-parser');
// user에게 public folder를 사용가능하게 제공 /public 이동시 public폴더를 볼 수있음 
//express.static : express의 정적 파일 제공
app.use("/public",express.static(__dirname +"/public"));

//미들웨어
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret:'keyboard cat',resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.authenticate('session'));


//home 경로 지정 
app.get ("/", (req, res) => res.render("home"));

//router 연결
app.use('/',authRouter); 
app.use('/myaccount', myaccountRouter);
app.use('/users',userRouter)


//서버 생성
const handleListen =() => console.log(`Listenning on http://localhost:3000`);
app.listen(3000,handleListen);