import test from 'ava';

import haskey from '../';

test('haskey: should return { pass: true, missing: [] }', t => {
  const { pass, missing } = haskey({ a: 1, b: 2, c: 3 }, ['a', 'b', 'c']);
  t.true(pass);
  t.is(missing.length, 0);
});

test('haskey: should return missing keys given an array', t => {
  const { pass, missing } = haskey({ a: 1, b: 2, c: 3 }, ['a', 'b', 'c', 'd']);
  const [key] = missing;
  t.false(pass);
  t.is(key, 'd');
});

test('haskey: should return { pass: true, missing: [] } given comma separated keys', t => {
  const { pass, missing } = haskey({ a: 1, b: 2, c: 3 }, 'a, b, c');
  t.true(pass);
  t.is(missing.length, 0);
});

test('haskey: should return missing keys given comma separated keys', t => {
  const { pass, missing } = haskey({ a: 1, b: 2, c: 3 }, 'f, a, b, c');
  const [key] = missing;
  t.false(pass);
  t.is(key, 'f');
});

test('haskey: should return { pass: true, missing: [] } given string of whitespaced keys', t => {
  const { pass, missing } = haskey({ a: 1, b: 2, c: 3 }, 'a b c');
  t.true(pass);
  t.is(missing.length, 0);
});

test('haskey: should return missing keys given string of whitespaced keys', t => {
  const { pass, missing } = haskey({ a: 1, b: 2, c: 3 }, 'a b c d');
  const [key] = missing;
  t.false(pass);
  t.is(key, 'd');
});

test('haskey: should throw TypeError when keys param is object', t => {
  const error = t.throws(() => {
    haskey({ a: 1, b: 2 }, {}), TypeError;
  });
  t.is(error.message, 'keys must be a string or array of strings');
});

test('haskey: should throw TypeError when keys param is number', t => {
  const error = t.throws(() => {
    haskey({ a: 1, b: 2 }, 1), TypeError;
  });
  t.is(error.message, 'keys must be a string or array of strings');
});

test('haskey: should throw TypeError when given invalid js object', t => {
  const error = t.throws(() => {
    haskey([], 'a b c'), TypeError;
  });
  t.is(error.message, 'invalid object');
});
