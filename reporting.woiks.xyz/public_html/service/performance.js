const constants = require("../constants");
const performanceDB = require("../db/performance");

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
      throw "invalid/missing parameter.";
    }
    return await performanceDB.insertPerformance(performance);
  } catch (err) {
    throw err;
  }
};

module.exports.getAllPerformance = async (performance) => {
  try {
    return await performanceDB.getAllPerformances();
  } catch (err) {
    throw err;
  }
};

module.exports.getByID = async (id) => {
  try {
    if (!id) throw "service.performance.getByID(): invalid parameter";
    return await performanceDB.getByID(id);
  } catch (err) {
    throw err;
  }
};

module.exports.updatePerformance = async (id, performance) => {
    try {
      if (!performance) throw "service.performance.updatePerformance(): Cannot have empty input";
      return await performanceDB.updatePerformance(id, performance);
    } catch (err) {
      throw err;
    }
  };

  module.exports.deletePerformance = async (id) => {
    try {
        if (!id) throw "service.performance.deletePerformance(): invalid parameter"
        return await performanceDB.deletePerformance(id);
    } catch (err) {
      throw err;
    }
  };