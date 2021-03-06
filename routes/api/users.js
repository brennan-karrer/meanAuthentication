const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const config = require('../../config/database');

router.get('/', (req, res, next) => {
  User.find({})
    .exec((err, users) => {
      if (err) {
        console.error('Error retrieving users due to: ' + err);
      } else {
        res.json(users);
      }
    })
});

// Return a list of users
// router.get('/', (req, res, next) => {
//   User.getAllUsers((err, users) => {
//     if (err) throw err;
//     res.json(users);
//   });
// });

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user.' });
    } else {
      res.json({ success: true, msg: 'User registered!' });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found.' });
    }

    User.verifyPassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // One Week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
          } // Build user object so that password is not returned.
        })
      } else {
        return res.json({ success: false, msg: 'Wrong password.' });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ user: req.user });
});

module.exports = router;
