// generateUniqueId.js

const { v4: uuidv4 } = require('uuid');

module.exports = function generateUniqueId() {
  return uuidv4();
};
