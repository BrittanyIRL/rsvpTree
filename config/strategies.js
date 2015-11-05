var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../models');

module.exports = {
  localStrategy: new LocalStrategy({
      usernameField: 'email'
    },
    function(email, password, done) {
      console.log('asldkfjalsdkfj');
      db.user.find({where: {email: email}}).then(function(user) {
        if (user) {
          user.checkPassword(password, function(err, result) {
            if (err) return done(err);
            if (result) {
              done(null, user.get());
            } else {
              done(null, false, {message: 'Invalid password'});
            }
          });
        } else {
          done(null, false, {message: 'Unknown user'});
        }
      });
    }
  ),
  facebookStrategy: new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.BASE_URL + '/auth/callback/facebook',
      profileFields: ['email', 'displayName']
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('hitting facebookstrat');
      db.provider.find({
        where: {
          providerId: profile.id,
          type: profile.provider
        },
        include: [db.user]
      }).then(function(provider) {
        if (provider && provider.user) {
          provider.token = accessToken;
          provider.save().then(function() {
            done(null, provider.user.get());
          });
        } else {
          var email = profile.emails[0].value;
          db.user.findOrCreate({
            where: {email: email},
            defaults: {firstName: profile.displayName}
          }).spread(function(user, created) {
            if (created) {
              user.createProvider({
                providerId: profile.id,
                token: accessToken,
                type: profile.provider
              }).then(function() {
                done(null, user.get());
              })
            } else {
              done(null, false, {message: 'You already signed up with this email address. Please login'});
            }
          });
        }
      });
    }
  ),
  serializeUser: function(user, done) {
    done(null, user.id);
  },
  deserializeUser: function(id, done) {
    db.user.findById(id).then(function(user) {
      done(null, user.get());
    }).catch(done);
  }
}