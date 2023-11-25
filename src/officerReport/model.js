const mongose = require('mongoose');
const { model, Schema } = mongose;

const officerReportSchema = {
  message: {
    type: String,
    minlength: 3,
  },
  imageReport: [String],
  officer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

officerReportSchema.path('imageReport').validate(
  (value) => {
    console.log(value.length);
    if (!value.length) {
      throw 'imageReport is required';
    }
  },
  (attr) => `${attr.value} is required`,
);

module.exports = model('OfficerReport', officerReportSchema);
