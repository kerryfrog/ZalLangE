
//임시 db


var sqlite3 = require('sqlite3');

module.exports = new sqlite3.Database('db.sqlite3');



/*
var mysql = require('mysql');

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'malPS'
  });
  
  db.connect();

  module.exports =db;
  
  //CREATE DATABASE mallPS
  /*
  CREATE TABLE users(username varchar(20) not null, pw varchar(20) not null
  )
  */