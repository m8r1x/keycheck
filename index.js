"use strict";
/**
 * Checks for the existence of specified keys in object
 *
 * @param {Object} object - object to check
 * @param {array|string} keys - delimited string of keys or array of keys
 * @return {Object} - key boolean map i.e. { [key]: boolean }
 */
exports.default = module.exports = function keycheck(object, keys) {
  if (object.toString() !== "[object Object]") {
    throw new TypeError("Invalid JSON object!");
  }
  if (!(Array.isArray(keys) || typeof keys === "string")) {
    throw new TypeError("Keys must be a string or array of strings!");
  }
  if (typeof keys === "string") {
    keys = keys.match(/\w+((-|_)\w+)?/g);
  }
  return keys.reduce((keyBoolMap, currentKey) => {
    keyBoolMap[currentKey] = Object.prototype.hasOwnProperty.call(object, currentKey)
    return keyBoolMap;
  }, {})
};
