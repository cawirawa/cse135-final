const constants = require('../constants')
var ObjectId = require("mongodb").ObjectID;
var MongoClient = require("mongodb").MongoClient;
let userCollection;
MongoClient.connect(constants.MONGO_DB_URL, async (err, client) => {
    if (err) throw err;

    let db = await client.db("hw4");
    userCollection = db.collection('user')
});

module.exports.insertUser = async (user) => {
    try {
        if (
            !user.username ||
            !user.email ||
            !user.password ||
            !user.isAdmin
            ) {
                throw "db.auth.insertUser(): invalid parameter"
        }
        let result = await userCollection.insertOne(user)
        if (!result['ops'] || result['ops'] && result['ops'].length == 0) {
            throw "db.auth.insertUser(): Could not create a new row."
        }
        return result['ops']
    } catch (err) {
        throw err
    }
}

module.exports.updateUser = async (user) => {
    try {
        if (
            !user._id ||
            !user.username ||
            !user.email ||
            !user.password ||
            !user.isAdmin
            ) {
                throw "db.auth.updateUser(): invalid parameter"
        }
        let result = await userCollection.updateOne({
            _id: new ObjectId(user._id),
        }, {
            $set: user
        })
        if (result['ops'] && result['ops'].length == 0) {
            throw "db.auth.updateUser(): Could not update row."
        }
        return result
    } catch (err) {
        throw err
    }
}

module.exports.getUserByEmail = async (email) => {
    try {
        return await userCollection.findOne({
            email,
        })
    } catch (err) {
        throw err
    }
}