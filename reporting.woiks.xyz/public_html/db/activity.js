const constants = require("../constants");
var ObjectId = require("mongodb").ObjectID;
var MongoClient = require("mongodb").MongoClient;
let activityCollection;
MongoClient.connect(constants.MONGO_DB_URL, async (err, client) => {
  if (err) throw err;

  let db = await client.db("mydb");
  activityCollection = db.collection("activity");
});

module.exports.insertActivity = async (activity) => {
  try {
    if (
      activity.userAgent === undefined ||
      activity.language === undefined ||
      activity.acceptCookies === undefined ||
      activity.allowJavascript === undefined ||
      activity.allowImages === undefined ||
      activity.allowCss === undefined ||
      activity.screenDimension === undefined ||
      activity.windowDimension === undefined ||
      activity.networkConnectionType === undefined
    ) {
      throw "db.activity.insertActivity(): invalid parameter";
    }

    let result = await activityCollection.insertOne(activity);
    if (!result["ops"] || (result["ops"] && result["ops"].length == 0)) {
      throw "db.activity.insertActivity(): Could not create a new row.";
    }
    result = await activityCollection.find({}).toArray();
    result.forEach((element) => {
      element.id = element._id;
      delete element._id;
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllActivitys = async () => {
  try {
    let result = await activityCollection.find({}).toArray();
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
    if (!id) throw "db.activity.getByID(): invalid parameter";
    let result = await activityCollection.findOne({
      _id: new ObjectId(id),
    });
    result.id = result._id;
    delete result._id;
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.updateActivity = async (id, activity) => {
  try {
    let result = await activityCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: activity,
      }
    );
    if (result && result["result"] && result["result"]["ok"]) {
      result = await activityCollection.findOne({ _id: new ObjectId(id) });
    }
    result.id = result._id;
    delete result._id;
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteActivity = async (id) => {
  try {
    if (!id) {
      throw "db.activity.deleteActivity(): invalid parameter";
    }
    await activityCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    throw err;
  }
};
