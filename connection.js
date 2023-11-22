const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const mongodbAtlas =
  'mongodb://serenity:serenitylink@ac-ic7ust3-shard-00-00.rb7mi9g.mongodb.net:27017,ac-ic7ust3-shard-00-01.rb7mi9g.mongodb.net:27017,ac-ic7ust3-shard-00-02.rb7mi9g.mongodb.net:27017/serenity?replicaSet=atlas-munim4-shard-0&ssl=true&authSource=admin';
const localConnection =
  'mongodb://diki:1234@localhost:27017/serenity?authSource=admin';

mongoose.connect(localConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', async () => {
  console.log('database connect');
});
