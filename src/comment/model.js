const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const commentSchema = {
  name: {
    type: String,
  },
  message: {
    type: String,
    required: [true, 'pesan harus ada'],
    minlength: 1,
    maxlength: 200,
  },
};

module.exports = model('Comment', commentSchema);
