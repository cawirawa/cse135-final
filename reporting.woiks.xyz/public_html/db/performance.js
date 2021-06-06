const constants = require("../constants");
var ObjectId = require("mongodb").ObjectID;
var MongoClient = require("mongodb").MongoClient;
let performanceCollection;
MongoClient.connect(constants.MONGO_DB_URL, async (err, client) => {
  if (err) throw err;

  let db = await client.db("mydb");
  performanceCollection = db.collection("performance");
});

module.exports.insertPerformance = async (performance) => {
  try {
    if (
      performance.userAgent === undefined ||
      performance.language === undefined ||
      performance.acceptCookies === undefined ||
      performance.allowJavascript === undefined ||
      performance.allowImages === undefined ||
      performance.allowCss === undefined ||
      performance.screenDimension === undefined ||
      performance.windowDimension === undefined ||
      performance.networkConnectionType === undefined
    ) {
      throw "db.performance.insertPerformance(): invalid parameter";
    }

    let result = await performanceCollection.insertOne(performance);
    if (!result["ops"] || (result["ops"] && result["ops"].length == 0)) {
      throw "db.performance.insertPerformance(): Could not create a new row.";
    }
    result = await performanceCollection.find({}).toArray();
    result.forEach((element) => {
      element.id = element._id;
      delete element._id;
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllPerformances = async () => {
  try {
    let result = await performanceCollection.find({}).toArray();
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
    if (!id) throw "db.performance.getByID(): invalid parameter";
    let result = await performanceCollection.findOne({
      _id: new ObjectId(id),
    });
    result.id = result._id;
    delete result._id;
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.updatePerformance = async (id, performance) => {
  try {
    let result = await performanceCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: performance,
      }
    );
    if (result && result["result"] && result["result"]["ok"]) {
      result = await performanceCollection.findOne({ _id: new ObjectId(id) });
    }
    result.id = result._id;
    delete result._id;
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports.deletePerformance = async (id) => {
  try {
    if (!id) {
      throw "db.performance.deletePerformance(): invalid parameter";
    }
    await performanceCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    throw err;
  }
};
