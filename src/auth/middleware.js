const { getToken } = require('../utils/getToken');
const jwt = require('jsonwebtoken');
const User = require('../user/model');

function decodeToken() {
  return async function (req, res, next) {
    try {
      let token = getToken(req);
      //   jika request tidak memiliki token maka
      if (!token) return next();
      req.user = jwt.verify(token, '');

      let user = await User.findOne({ token: { $in: [token] } }).select(
        '-__v -createdAt -updatedAt -token -password',
      );
      if (!user) {
        return res.json({
          error: 1,
          message: 'token expired',
        });
      }
    } catch (err) {
      if (err && err.name === 'JsonWebTokenError') {
        return res.json({
          error: 1,
          message: err.message,
        });
      }
      next(err);
    }
    return next();
  };
}

module.exports = {
  decodeToken,
};
