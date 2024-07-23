const mongose = require('mongoose');
const { model, Schema } = mongose;

const officerReportSchema = Schema(
  {
    message: {
      type: String,
      minlength: 3,
    },
    imageReport: [String],
    officer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

officerReportSchema.path('imageReport').validate(
  (value) => {
    if (!value.length) {
      throw 'Gambar tidak boleh kosong';
    }
  },
  (attr) => `${attr.value} tidak boleh kosong`,
);

module.exports = model('OfficerReport', officerReportSchema);
