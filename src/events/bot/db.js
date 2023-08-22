const mongoose = require("mongoose");

const getModel = (type) => {
  try {
    return mongoose.model(type.charAt(0).toUpperCase() + type.slice(1));
  } catch (error) {
    console.error(`Model for type '${type}' not found.`);
    return null;
  }
};

const loadData = async (collectionName, userId, messageId) => {
  const Model = getModel(collectionName);
  if (!Model) return null;

  if (Model.schema.path("arr")) {
    // Check for array-based schema
    try {
      const pollData = await Model.findOne({ msgId: messageId });
      if (pollData) {
        return pollData.arr.find((entry) => entry.userId === userId) || null;
      }
      return null;
    } catch (error) {
      console.error(
        `Error loading data for collection '${collectionName}':`,
        error
      );
      return null;
    }
  } else {
    try {
      const data = await Model.find();
      return new Map(
        data.map((item) => [`${item.userId}-${item.messageId}`, item])
      );
    } catch (error) {
      console.error(
        `Error loading data for collection '${collectionName}':`,
        error
      );
      return new Map();
    }
  }
};

const saveData = async (item, collectionName) => {
  const Model = getModel(collectionName);
  if (!Model) return;

  if (Model.schema.path("arr")) {
    // Check for array-based schema
    try {
      await Model.findOneAndUpdate(
        { msgId: item.messageId },
        { $pull: { arr: { userId: item.userId } } },
        { upsert: true }
      );
      await Model.findOneAndUpdate(
        { msgId: item.messageId },
        { $push: { arr: item } }, // Here, we're pushing the entire item, regardless of its structure.
        { upsert: true }
      );
    } catch (error) {
      console.error(
        `Error saving data to collection '${collectionName}':`,
        error
      );
    }
  } else {
    try {
      await Model.findOneAndUpdate(
        { userId: item.userId, messageId: item.messageId },
        item,
        { upsert: true }
      );
    } catch (error) {
      console.error(
        `Error saving data to collection '${collectionName}':`,
        error
      );
    }
  }
};

module.exports = { loadData, saveData, getModel };
