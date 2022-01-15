var passport = require('passport');
var Strategy = require('passport-local');
var crypto = require('crypto');
var db = require('../lib/db');


module.exports = function() {
  passport.use(new Strategy(function(id, password, done) {
    db.get('SELECT rowid AS id, * FROM users WHERE id = ?', [ id ], function(err, row) {
      if (err) { return done(err); }
      if (!row) { return done(null, false, { message: 'Incorrect username or password.' }); }
      
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return done(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return done(null, false, { message: 'Incorrect username or password.' });
        } 
        var user = {
          id: row.id.toString(),
          nickname: row.nickname
        };
        console.log(user);
        return done(null, user);
      });
    });
  }));
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      //세션에 저장하는 코드 
      cb(null, { id: user.id, nickname: user.nickname });
    });
  });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

};
