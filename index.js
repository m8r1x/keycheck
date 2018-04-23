"use strict";
/**
 * Assert the input is a javascript object i.e. {}
 *
 * @param {Object} o - Object to assert
 * @return {boolean}
 */
const isObject = o => !!o && o.constructor === Object;

/**
 * Checks for the existence of specified keys in object
 *
 * @param {Object} object - object to check for presence of keys
 * @param {array|string} keys - array or string of keys to search for
 * @return {Object} { pass: boolean, missing: [ missing, keys ] }
 */
module.exports = object => keys => {
  if (!isObject(object)) {
    throw new TypeError("invalid object");
  }
  if (!(typeof keys === "string" || Array.isArray(keys))) {
    throw new TypeError("keys must be a string or array of strings");
  }
  let _keys =
    typeof keys === "string"
      ? keys
          .split(" ")
          .join()
          .split(",")
          .filter(key => key !== "")
      : keys;
  const results = { pass: false, missing: [] };
  const has = Object.prototype.hasOwnProperty;
  results.pass = _keys
    .map(key => has.call(object, key))
    .reduce((next, previous, index) => {
      if (!previous) {
        results.missing.push(_keys[index]);
      }
      return next && previous;
    }, true);
  return results;
};
