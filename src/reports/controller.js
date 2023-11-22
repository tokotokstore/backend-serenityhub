const ReportUser = require('./model');


async function addReport(req,res,next){
    try {
        
    } catch (err) {
        
    }
}

async function getReport(req, res, next) {
  try {
    const report = await ReportUser.findOne({ _id: req.params.id }).populate({
      path: 'comment',
      select: ['message', 'name'],
    });
    if (report) {
      res.send({
        status: 'ok',
        data: report,
      });
    }
  } catch (err) {
    return res.json({
      error: 1,
      message: 'report tidak ada',
    });
    next(err);
  }
}

module.exports = { getReport };
