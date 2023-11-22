const Comment = require('./model');
const ReportUser = require('../reports/model');

async function addComment(req, res, next) {
  try {
    const payload = req.body;
    let user = req.user;
    let comment = new Comment({ ...payload, name: user.name });
    const commentReport = await ReportUser.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comment: comment._id } },
    );
    console.log(comment);
    console.log(commentReport);
    await comment.save();
    if (comment) {
      return res.json({
        status: 'ok',
        message: 'comment added',
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

async function deleteComment(req, res, next) {
  try {
    const payload = req.body;
    let user = req.user;
    let comment = await Comment.findOneAndDelete({ _id: req.params.id });
    if (comment) {
      return res.json({
        status: 'ok',
        message: 'comment successfully deleted',
      });
    }
    return res.json({
      error: 1,
      message: 'comment not found',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { addComment, deleteComment };
