const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectionString =
  'mongodb://diki:1234@localhost:27017/serenity?authSource=admin';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', async () => {
  console.log('database connect');
});
