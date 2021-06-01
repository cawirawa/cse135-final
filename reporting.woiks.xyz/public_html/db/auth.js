const constants = require("../constants");
var ObjectId = require("mongodb").ObjectID;
var MongoClient = require("mongodb").MongoClient;
let userCollection;
MongoClient.connect(constants.MONGO_DB_URL, async (err, client) => {
  if (err) throw err;

  let db = await client.db("hw4");
  userCollection = db.collection("user");
});

module.exports.insertUser = async (user) => {
  try {
    if (
      !user.username ||
      !user.email ||
      !user.password ||
      user.isAdmin == undefined
    ) {
      throw "db.auth.insertUser(): invalid parameter";
    }
    let result = await userCollection.insertOne(user);
    if (!result["ops"] || (result["ops"] && result["ops"].length == 0)) {
      throw "db.auth.insertUser(): Could not create a new row.";
    }
    result = await userCollection.find({}).toArray();
    result.forEach((element) => {
      element.id = element._id;
      delete element._id;
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllUsers = async () => {
  try {
    let result = await userCollection.find({}).toArray();
    result.forEach((element) => {
      element.id = element._id;
      delete element._id;
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.getByID = async (id) => {
  try {
    if (!id) throw "db.auth.getByID(): invalid parameter";
    let result = await userCollection.findOne({
      _id: new ObjectId(id),
    });
    result.id = result._id;
    delete result._id;
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.updateUser = async (id, user) => {
  try {
    console.log(user);
    let result = await userCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: user,
      }
    );
    if (result && result["result"] && result["result"]["ok"]) {
      result = await userCollection.findOne({ _id: new ObjectId(id) });
    }
    result.id = result._id;
    delete result._id;
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteUser = async (id) => {
  try {
    if (!id) {
      throw "db.auth.deleteUser(): invalid parameter";
    }
    await userCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    throw err;
  }
};

module.exports.getUserByEmail = async (email) => {
  try {
    let result = await userCollection.findOne({
      email,
    });
    if (result) {
      result.id = result._id;
      delete result._id;
    }
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.getUserByUsername = async (username) => {
  try {
    let result = await userCollection.findOne({
      username,
    });
    if (result) {
      result.id = result._id;
      delete result._id;
    }

    return result;
  } catch (err) {
    throw err;
  }
};
