var passport = require('passport');
var Strategy = require('passport-local');
var crypto = require('crypto');
var db = require('../lib/db');


module.exports = function() {
  passport.use(new Strategy(function(id, password, done) {
    db.get('SELECT rowid AS rowid, * FROM users WHERE id = ?', [ id ], function(err, row) {
      if (err) { return done(err); }
      if (!row) { return done(null, false, { message: 'Incorrect username or password.' }); }
      
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return done(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return done(null, false, { message: 'Incorrect username or password.' });
        } 
        //console.log(row);
        var user = {
          rowid: row.rowid.toString(),
          id: row.id,
          nickname: row.nickname  
        };
        //console.log("boot/auth.js user", user);
        return done(null, user);
      });
    });
  }));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      //세션에 저장하는 코드 
      //console.log("serialize");
      cb(null, { rowid: user.rowid, id: user.id, nickname:user.nickname });
    });
  });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      //console.log("deseriallize");
      return cb(null, user);
    });
  });
};
