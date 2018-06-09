## keycheck
Checks for the existence of specified keys in an object

## Installation
```bash
$ npm install keycheck
```

## Usage
```javascript
const keycheck = require("keycheck");
// ts: import * as keycheck from "keycheck";

const user = {
  firstName: "willie",
  lastName: "m.i.k."
};

const keys = ["firstName", "lastName", "age"]; // or "firstName lastName age"
const result = keycheck(user, keys);

// { firstName: true, lastName: true, age: false }
```

## API

### `keycheck(object, keys)`

  | Param | Description |
  | ----- | :--------- |
  | object | valid JSON object |
  | keys   | delimited string or array of strings |

**NOTE**: Any character can be used as a delimiter except `-` and `_`.

## License
[MIT]

**Free software, Hell Yeah**

[MIT]: https://opensource.org/licenses/MIT
