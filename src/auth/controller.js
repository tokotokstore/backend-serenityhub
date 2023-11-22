const User = require('./model');

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
};
