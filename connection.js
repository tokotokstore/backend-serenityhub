const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const mongodbAtlas = 'link mongodb atlas'
const localConnection =
  'mongodb://localhost:27017/serenity?authSource=admin';

mongoose.connect(localConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', async () => {
  console.log('database connect');
});
