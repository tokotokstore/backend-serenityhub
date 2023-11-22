const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const reportSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'judul harus ada'],
      minlength: 5,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, 'deskripsi harus ada'],
      minlength: 5,
      maxlength: 250,
    },
    address: {
      type: String,
      required: [true, 'alamat harus ada'],
      minlength: 10,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    status: {
      type: String,
      enum: ['accepted', 'process', 'done', 'rejecected'],
      default: ['accepted'],
    },
    imageReport: [String],
    imageFinished: [String],
    officer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timeStamps: true },
);

module.exports = model('Report', reportSchema);
