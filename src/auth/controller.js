const User = require('./model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function register(req, res, next) {
  try {
    const payload = req.body;
    let user = new User(payload);
    await user.save();

    return res.json(user);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
}

async function localStrategy(email, password, done) {
  try {
    let user = await User.findOne({
      email,
    }).select('-__v -createdAt -updatedAt  -token');

    if (!user) return done();
    if (bcrypt.compareSync(password, user.password)) {
      ({ password, ...userWithoutPassword } = user.toJSON());

      return done(null, userWithoutPassword);
    }
  } catch (err) {
    done(err, null);
  }
  done();
}

async function login(req, res, next) {
  passport.authenticate('local', async function (err, user) {
    if (err) return next(err);
    if (!user)
      return res.json({
        error: 1,
        message: 'email or password incorrect',
      });
    // Change secret key
    let signed = jwt.sign(user, 'SECRETKEY');
    await User.findOneAndUpdate(
      { _id: user._id },
      // agar bisa input token lebih dari satu, sehingga user bisa login perangkat yang berbeda
      //      { $push: { token: signed } },
      //  hanya bisa login di satu perangkat, karena token hanya 1 saja
      { $set: { token: signed } },
      { new: true },
    );
    return res.json({
      message: 'logged in successfully',
      user: user,
      token: signed,
    });
  })(req, res, next);
}

async function show(req, res, next) {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (err) {
    return res.json({
      error: 1,
    });
  }
}

module.exports = {
  register,
  show,
  localStrategy,
  login,
};
