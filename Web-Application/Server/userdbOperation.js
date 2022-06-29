const { MongoClient } = require('mongodb');

const connect = async (url) => {
  try {
    const conn = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    console.log(`Connected to the database: ${conn.databaseName}`);
    return conn;
  } catch (err) {
    console.error(err);
    throw new Error('could not connect to the db');
  }
};

const checkUser = async (
  db,
  userName,
  password,
) => {
  try {
    const result = await db.collection('user').findOne({ username: userName, password });
    return result;
  } catch (e) {
    throw new Error('fail to get post');
  }
};

module.exports = {
  connect,
  checkUser,
};
