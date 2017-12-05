## haskey
Checks for the existence of specified keys in an object

## Installation
```bash
$ npm install haskey
```

## Basic Usage
```javascript
const user = {
  name: 'willie',
  last: 'm.i.k.'
};

const { pass, missing } = haskey(user)(['name', 'last']);

// pass : true
// missing: []
```
you may also use `comma separated keys`
```javascript
const { pass, missing } = haskey(user)('name, last');
```
or `whitespaced separated keys`
```javascript
const { pass, missing } = haskey(user)('name last');
```
or `both`
```javascript
const { pass, missing } = haskey(user)('name,last email');
```

## Common Usage Example
```javascript

const otherUser = {
  _id: 1
};

const { pass, missing } = haskey(otherUser)('name email last')

if (!pass) {
  throw new Error(`user object missing: ${missing} keys`)
}

// pass: false
// missing: ['name', 'email', 'last']
// Error: user object missing name,email,last keys
```

## License
[MIT]

**Free software, Hell Yeah**

[MIT]: <https://opensource.org/licenses/MIT>
