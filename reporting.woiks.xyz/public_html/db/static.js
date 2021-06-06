const constants = require("../constants");
var ObjectId = require("mongodb").ObjectID;
var MongoClient = require("mongodb").MongoClient;
let staticCollection;
MongoClient.connect(constants.MONGO_DB_URL, async (err, client) => {
  if (err) throw err;

  let db = await client.db("mydb");
  staticCollection = db.collection("static");
});

module.exports.insertStatic = async (static) => {
  try {
    if (
      static.userAgent === undefined ||
      static.language === undefined ||
      static.acceptCookies === undefined ||
      static.allowJavascript === undefined ||
      static.allowImages === undefined ||
      static.allowCss === undefined ||
      static.screenDimension === undefined ||
      static.windowDimension === undefined ||
      static.networkConnectionType === undefined
    ) {
      throw "db.static.insertStatic(): invalid parameter";
    }

    let result = await staticCollection.insertOne(static);
    if (!result["ops"] || (result["ops"] && result["ops"].length == 0)) {
      throw "db.static.insertStatic(): Could not create a new row.";
    }
    result = await staticCollection.find({}).toArray();
    result.forEach((element) => {
      element.id = element._id;
      delete element._id;
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllStatics = async () => {
  try {
    let result = await staticCollection.find({}).toArray();
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
    if (!id) throw "db.static.getByID(): invalid parameter";
    let result = await staticCollection.findOne({
      _id: new ObjectId(id),
    });
    result.id = result._id;
    delete result._id;
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.updateStatic = async (id, static) => {
  try {
    let result = await staticCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: static,
      }
    );
    if (result && result["result"] && result["result"]["ok"]) {
      result = await staticCollection.findOne({ _id: new ObjectId(id) });
    }
    result.id = result._id;
    delete result._id;
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteStatic = async (id) => {
  try {
    if (!id) {
      throw "db.static.deleteStatic(): invalid parameter";
    }
    await staticCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    throw err;
  }
};
