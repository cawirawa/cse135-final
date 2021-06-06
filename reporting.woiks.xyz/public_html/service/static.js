const constants = require("../constants");
const staticDB = require("../db/static");

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
      throw "invalid/missing parameter.";
    }
    return await staticDB.insertStatic(static);
  } catch (err) {
    throw err;
  }
};

module.exports.getAllStatic = async (static) => {
  try {
    return await staticDB.getAllStatics();
  } catch (err) {
    throw err;
  }
};

module.exports.getByID = async (id) => {
  try {
    if (!id) throw "service.static.getByID(): invalid parameter";
    return await staticDB.getByID(id);
  } catch (err) {
    throw err;
  }
};

module.exports.updateStatic = async (id, static) => {
    try {
      if (!static) throw "service.static.updateStatic(): Cannot have empty input";
      return await staticDB.updateStatic(id, static);
    } catch (err) {
      throw err;
    }
  };

  module.exports.deleteStatic = async (id) => {
    try {
        if (!id) throw "service.static.deleteStatic(): invalid parameter"
        return await staticDB.deleteStatic(id);
    } catch (err) {
      throw err;
    }
  };