const { MongoClient, ObjectIdectId } = require('mongodb');

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

const findOrCreate = async (db, query) => {
  try {
    let user = await db.collection('user').findOne(query);
    
    if (!user) {
      const result = await db.collection('user').insertOne(query);
      user = result.ops[0];
    }

    return user;
  } catch (e) {
    throw new Error('Failed to find or create user');
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
  findOrCreate,
};
