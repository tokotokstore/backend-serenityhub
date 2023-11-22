const { MongoClient } = require('mongodb');

const connectionString = 'mongodb://user_latihan:123456@localhost:27017?authSource=admin';
const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
})();
