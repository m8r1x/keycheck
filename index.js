'use strict';
/**
 * Assert the input is a javascript object i.e. {}
 *
 * @param {Object} o - Object to assert
 * @return {boolean}
 */
exports.isObject = o => !!o && o.constructor === Object;

/**
 * Checks for the existence of specified keys in object
 *
 * @param {Object} object - object to check for presence of keys
 * @param {array|string} keys - array or string of keys to search for
 * @return {Object} { pass: boolean, missing: [ missing, keys ] }
*/
exports.haskey = (object, keys) => {
  if (!this.isObject(object)) {
    throw new TypeError('invalid object');
  }
  if(!(typeof keys === 'string' || Array.isArray(keys))) {
    throw new TypeError('keys must be a string or array of strings');
  }
  keys =
    typeof keys === 'string'
      ? keys.includes(',')
        ? keys.replace(/\s+/g, '').split(',')
        : keys.split(/\s+/)
      : keys;
  const results = { pass: false, missing: [] };
  results.pass = keys
    .map(key => Object.prototype.hasOwnProperty.call(object, key))
    .reduce((next, previous, index) => {
      if (!previous) {
        results.missing.push(keys[index]);
      }
      return next && previous;
    }, true);
  return results;
};
