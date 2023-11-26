const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const unitWorkSchema = Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'nama harus ada'],
  },
  detail: {
    type: String,
  },
  image: {
    type: String,
    required: [true, 'gambar harus ada'],
  },
});

module.exports = model('UnitWork', unitWorkSchema);
