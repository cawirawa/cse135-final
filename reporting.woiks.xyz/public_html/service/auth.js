const bcrypt = require('bcrypt');
const { createImportSpecifier } = require('typescript');
const constants = require('../constants')

const authDB = require('../db/auth')

const saltRounds = 10;

module.exports.insertUser = async (user) => {
    try {
        if (
            !user.username ||
            !user.email ||
            !user.password ||
            !user.isAdmin
            ) {
                throw "invalid/missing parameter."
        }
        user.password = await bcrypt.hash(user.password, saltRounds);
        return await authDB.insertUser(user)
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            if (err.keyPattern.email) throw 'Email has already been used!';
            if (err.keyPattern.username) throw 'Username has already been used!';
          }
        throw err
    }
}

module.exports.getAllUsers = async () => {
    try {
        return await authDB.getAllUsers()
    } catch (err) {
        throw err
    }
}

module.exports.getUserByID = async (id) => {
    try {
        return await authDB.getByID(id)
    } catch (err) {
        throw err
    }
}

module.exports.updateUser = async (id, user) => {
    try {
        if (
            !id ||
            !user.username ||
            !user.email ||
            !user.password ||
            !user.isAdmin
            ) {
                throw "invalid/missing parameter."
        }
        user.password = await bcrypt.hash(user.password, saltRounds);
        return await authDB.updateUser(id, user)
    } catch (err) {
        throw err
    }
}

module.exports.deleteUser = async (id) => {
    try {
        if (
            !id
            ) {
                throw "invalid/missing parameter."
        }
        return await authDB.deleteUser(id)
    } catch (err) {
        throw err
    }
}

module.exports.login = async (email, password) => {
    try {
        if (typeof email != constants.STRING) {
            throw "Invalid email/username."
        }
        if (typeof password != constants.STRING) {
            throw "Invalid password."
        }

        email.toLowerCase()
        let userAccount = await authDB.getUserByEmail(email)
        if (!userAccount) {
            userAccount = await authDB.getUserByUsername(email) 
        }

        if (!userAccount) {
            throw "User not found"
        }

        if (!bcrypt.compareSync(password, userAccount.password)) {
            throw "Incorrect Password"
        }
        
        return userAccount
    } catch (err) {
        throw err
    }
}
