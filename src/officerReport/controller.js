const ReportUser = require('../reports/model');
const OfficerReport = require('./model');
const User = require('../user/model');

async function addReport(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `You're not not login or token expired`,
    });
  }
  try {
    const payload = req.body;
    const user = req.user;

    const newOfficerReport = new OfficerReport({ ...payload, user: user._id });
    await ReportUser.findOneAndUpdate(
      { _id: req.param.id },
      { $set: { officerReport: user._id } },
    );
    if (newOfficerReport) {
      res.json({
        status: 'ok',
        message: 'report sent successfully',
        idReport: newOfficerReport._id,
      });
    }
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

module.exports = {
  addReport,
};
