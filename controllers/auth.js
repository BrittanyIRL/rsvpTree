var express = require('express');
var db = require('./../models');
var request = require('request');
var passport = require('passport');
var router = express.Router();

router.get('/signup', function(req, res){
    res.render('auth/signup');
  });
router.post('/signup', function(req, res){
    console.log(req.body);
    var newUser = req.body;
    if (newUser.password != newUser.password2) {
      console.log(newUser.password + newUser.password2);
      req.flash('danger', 'Passwords do not match');
      res.redirect('signup');
    } else {
      console.log('found else');
      db.user.create({
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          password: newUser.password
      }).then(function(user, created) {
        // if (created) {
          req.login(user, function(err) {
            if (err) throw err;
            req.flash('success', 'You are signed up and logged in.');
            console.log('signed up and logged in');
            res.render('portal/index');
          })
        // } else {
        //   req.flash('danger', 'A user with that e-mail address already exists.');
        //   console.log('user with that email already exists');
        //   res.redirect('signup');
        // };
        .catch(function(err) {
        req.flash('danger','Error');
        console.log('error');
        res.redirect('signup');
      });
  })
  };
});

router.get('/login', function(req, res) {
    res.render('auth/login');
  });

router.post('/login', function(req, res) {
    passport.authenticate('local', function(err, user, info) {
       console.log(user);
      if (user) {
        req.login(user, function(err) {
          console.log('user recognized');
          if (err) throw err;
          req.flash('success', 'You are now logged in.');
          res.render('portal/index');
        });
      } else {
        req.flash('danger', 'Error');
        res.redirect('auth/login');
      }
  });
});

router.get('/login/:provider', function(req, res) {
  passport.authenticate(
    req.params.provider,
    {scope: ['public_profile', 'email']}
  )(req, res);
});

//THIS WORKS
router.get('/callback/:provider', function(req, res) {
  passport.authenticate(req.params.provider, function(err, user, info) {
        console.log('logged in');
        console.log(info);
    if (err) throw err;
    if (user) {
      req.login(user, function(err) {
        if (err) throw err;
        req.flash('success', 'You are now logged in with ' + req.params.provider);
        res.render('portal/index');
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


