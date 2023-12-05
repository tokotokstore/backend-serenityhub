const User = require('./model');

async function getOFficer(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `You're not not login or token expired`,
    });
  }
  try {
    const userRole = req.user.role;
    if (!userRole === 'admin') {
      res.json({
        error: 1,
        message: 'your not allowed access',
      });
    } else {
      let { limit = 8, skip = 0, unitwork = '' } = req.query;
      let criteria = {
        role: 'officer',
      };
      if (unitwork.length) {
        criteria = {
          ...criteria,
          unitWork: unitwork,
        };
      }

      const officer = await User.find(criteria).select(
        '_id name role unitWork',
      );
      const totalOfficer = await User.find(criteria).countDocuments();

      if (officer) {
        return res.json({
          status: 'ok',
          cout: totalOfficer,
          data: officer,
        });
      }
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: err.message,
    });
    next(err);
  }
}

module.exports = { getOFficer };
