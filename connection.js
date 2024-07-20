const mongoose = require('mongoose');
const config = require('./src/config');
const {
  dbHost,
  dbName,
  dbPassword,
  dbPort,
  dbUser,
  maUser,
  maPassword,
  maServer,
} = config;

mongoose.set('strictQuery', false);
<<<<<<< HEAD
const mongodb = `mongodb://${maUser}:${maPassword}@monorail.proxy.rlwy.net:58932`;

const localConnection = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

mongoose.connect(mongodb, {
=======
const mongodbAtlas = `mongodb://${maUser}:${maPassword}@monorail.proxy.rlwy.net:58932`;

const localConnection = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

mongoose.connect(mongodbAtlas, {
>>>>>>> db25c4cad490ae3504b1bbbb3d1fe66a69fe0527
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', async () => {
  console.log('database connect');
});

module.exports = db;