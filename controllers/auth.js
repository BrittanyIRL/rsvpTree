var express = require('express');
var db = require('./../models');
var passport = require('passport');
var router = express.Router();

router.route('/signup')
  .get(function(req, res) {
    res.redirect('/auth/signup');
  })
  .post(function(req, res) {
    if (req.body.password != req.body.password2) {
      req.flash('danger', 'Passwords do not match');
      res.redirect('/auth/signup');
    } else {
      db.user.findOrCreate({
        where: {email: req.body.email},
        defaults: {
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }
      }).spread(function(user, created) {
        if (created) {
          req.login(user, function(err) {
            if (err) throw err;
            req.flash('success', 'You are signed up and logged in.')
            res.redirect('/admin');
          });
        } else {
          req.flash('danger', 'A user with that e-mail address already exists.');
          res.redirect('/auth/signup');
        }
      }).catch(function(err) {
        req.flash('danger','Error');
        res.redirect('/auth/signup');
      });
    }
  });

router.route('/login')
  .get(function(req, res) {
    res.render('auth/login');
  })
  .post(function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (user) {
        req.login(user, function(err) {
          if (err) throw err;
          req.flash('success', 'You are now logged in.');
          res.redirect('portal/index');
        });
      } else {
        req.flash('danger', 'Error');
        res.redirect('auth/login');
      }
    })(req, res);
  });

router.get('/login/:provider', function(req, res) {
  passport.authenticate(
    req.params.provider,
    {scope: ['public_profile', 'email']}
  )(req, res);
});

router.get('/callback/:provider', function(req, res) {
  passport.authenticate(req.params.provider, function(err, user, info) {
        console.log('logged in');
    if (err) throw err;
    if (user) {
      req.login(user, function(err) {
        if (err) throw err;
        req.flash('success', 'You are now logged in with ' + req.params.provider);
        res.redirect('/portal');
      });
    } else {
      req.flash('danger', 'Error');
      res.redirect('/auth/login');
    }
  })(req, res);
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('http://localhost:3000');
});

module.exports = router;