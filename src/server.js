import express from "express";
import passport from "passport";
import logger from 'morgan';
// Router 정의
var userRouter = require('../routes/users');

const app =express();

require('../boot/db')();
require('../boot/auth')();

//views의 엔진 설정
app.set('view engine', "pug");
app.set("views",__dirname+ "/views");

var bodyParser =require('body-parser');

//미들웨어
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret:'keyboard cat',resave: false, saveUninitialized: false }));
//express.static : express의 정적 파일 제공 
// user에게 public folder를 사용가능하게 제공 /public 이동시 public폴더를 볼 수있음 
app.use("/public",express.static(__dirname +"/public"));


app.use(function(req, res, next) {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    next();
  });
app.use(passport.authenticate('session'));

app.get ("/", (req, res) => res.render("home"));
app.use('/users',userRouter)

const handleListen =() => console.log(`Listenning on http://localhost:3000`);
// 어떤 주소를 받아도 /로  redirect  시킴 
// render : 값을 보냄 response :특정 주소로 보내버림 요 
//app.get ("/*", (req, res) => res.redirect("/"));
app.listen(3000,handleListen);