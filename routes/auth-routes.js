const express = require('express');
const authRoutes = express.Router();
const mongoose = require('mongoose')
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/user-model');



authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const street = req.body.street;
  const number = req.body.number;
  const complement = req.body.complement;
  const city = req.body.city;
  const state = req.body.state;
  const zipcode = req.body.zipcode;
  const phoneNumber = req.body.phoneNumber;
  const cpf = req.body.cpf;
  const admin = req.body.admin;

  

  if (!username || !password) {
    res.status(400).json({ message: 'Provide email and password' });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad" });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'User already exists. Please login.' });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username: username,
      password: hashPass,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      cpf: cpf,
      admin : admin,
      address: {
        street: street,
        number: number,
        complement: complement,
        city: city,
        state: state,
        zipcode: zipcode
      }
    });

    aNewUser.save(err => {
      if (err) {
        res.status(400).json({
          message: ' Saving user to database went wrong.'
        });
        return;
      }

      req.login(aNewUser, (err) => {
        if (err) {
          res.status(500).json({
            message: 'Login after signup went bad'
          });
          return;
        }

        res.status(200).json(aNewUser);
      });
    });
  });
});


authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }

      res.status(200).json(theUser);
      
    });
  })(req, res, next);
});

authRoutes.put('/user/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: ` ${req.params.id} is updated successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});


authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});


module.exports = authRoutes;