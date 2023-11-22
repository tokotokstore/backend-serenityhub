const mongose = require('mongoose');
const { model, Schema } = mongose;

const officerReportSchema = {
  message: {
    type: String,
    minlength: 3,
  },
  image: [String],
};
