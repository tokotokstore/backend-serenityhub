const mongose = require('mongoose');
const { model, Schema } = mongose;

const officerReportSchema = {
  message: {
    type: String,
    minlength: 3,
  },
  image: [String],
  officer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

module.exports = model('OfficerReport', officerReportSchema);
