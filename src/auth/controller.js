const User = require('../user/model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/getToken');
const config = require('../config');

// Officer register

async function officerRegister(req, res, next) {
  try {
    const payload = req.body;
    let user = new User({ ...payload, role: 'officer' });
    await user.save();
    if (user) {
      return res.json({
        status: 'ok',
        message: 'register successfuly',
      });
    }
    // return res.json(user);
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

// User register
async function register(req, res, next) {
  try {
    const payload = req.body;
    let user = new User(payload);
    await user.save();
    if (user) {
      return res.json({
        status: 'ok',
        message: 'register successfuly',
      });
    }
    // return res.json(user);
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
    }).select(' -__v  -createdAt -updatedAt -token ');

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

    let signed = jwt.sign(user, config.secretKey);
    await User.findOneAndUpdate(
      { _id: user._id },
      // agar bisa input token lebih dari satu, sehingga user bisa login perangkat yang berbeda
      // { $push: { token: signed } },

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

function me(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `You're not not login or token expired`,
    });
  }
  return res.json(req.user);
}

async function logout(req, res, next) {
  let token = getToken(req);
  const user = await User.findOneAndUpdate(
    { token: { $in: [token] } },
    { $pull: { token } },
    { useFindAndModify: false },
  );
  if (!user || !token) {
    return res.json({
      error: 1,
      message: 'No user found',
    });
  }

  return res.json({
    error: 0,
    message: 'Logout successfully',
  });
}

module.exports = {
  register,
  localStrategy,
  login,
  me,
  logout,
  officerRegister,
};
