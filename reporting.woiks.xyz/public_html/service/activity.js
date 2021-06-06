const constants = require("../constants");
const activityDB = require("../db/activity");

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
      throw "invalid/missing parameter.";
    }
    return await activityDB.insertActivity(activity);
  } catch (err) {
    throw err;
  }
};

module.exports.getAllActivity = async (activity) => {
  try {
    return await activityDB.getAllActivitys();
  } catch (err) {
    throw err;
  }
};

module.exports.getByID = async (id) => {
  try {
    if (!id) throw "service.activity.getByID(): invalid parameter";
    return await activityDB.getByID(id);
  } catch (err) {
    throw err;
  }
};

module.exports.updateActivity = async (id, activity) => {
    try {
      if (!activity) throw "service.activity.updateActivity(): Cannot have empty input";
      return await activityDB.updateActivity(id, activity);
    } catch (err) {
      throw err;
    }
  };

  module.exports.deleteActivity = async (id) => {
    try {
        if (!id) throw "service.activity.deleteActivity(): invalid parameter"
        return await activityDB.deleteActivity(id);
    } catch (err) {
      throw err;
    }
  };