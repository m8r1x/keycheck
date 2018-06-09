import test from 'ava';

import keycheck from '../';

test('it should return the expected result regardless of typos', t => {
  const expectedResult = { a: true, b: false };
  t.deepEqual(keycheck({ a: 1 }, "a b"), expectedResult);
  t.deepEqual(keycheck({ a: 1, c: 3 }, "a,b"), expectedResult);
  t.deepEqual(keycheck({ a: 1, d: ""}, "a    b"), expectedResult);
  t.deepEqual(keycheck({ a: 1 , m: "n"}, "a,      b"), expectedResult);
  t.deepEqual(keycheck({ a: 1, "c":"C" }, "a  ,      b"), expectedResult);
  t.deepEqual(keycheck({ a: 1, y: false }, "a  ,  ,    b"), expectedResult);
});

test('it should delimit using any character except `-` and `_`', t => {
  const expectedResult = { a: true, "b-c": false, "d_e": true };
  t.deepEqual(keycheck({ a: 1, "d_e": 3 }, "a%d_e & b-c"), expectedResult);
  t.deepEqual(keycheck({ a: 1, "d_e": "" }, "a b-c,d_e"), expectedResult);
  t.deepEqual(keycheck({ a: 1, "d_e": 3 }, "a,b-c     d_e"), expectedResult);
});

test('it should throw on invalid JSON object', t => {
  const error1 = t.throws(() => { keycheck([], "a  ,  ,    b") }, TypeError);
  const error2 = t.throws(() => { keycheck(1, "a  ,  ,    b") }, TypeError);
  const error3 = t.throws(() => { keycheck(() => {}, "a  ,  ,    b") }, TypeError);
  t.deepEqual(error1, error2);
  t.deepEqual(error2, error3);
  t.is(error3.message, "Invalid JSON object!");
});

test('it should throw on invalid keys param', t => {
  const error1 = t.throws(() => { keycheck({}, {}) }, TypeError);
  const error2 = t.throws(() => { keycheck({}, () => {}) }, TypeError);
  const error3 = t.throws(() => { keycheck({}, 1) }, TypeError);
  t.deepEqual(error1, error2);
  t.deepEqual(error2, error3);
  t.is(error3.message, "Keys must be a string or array of strings!");
});