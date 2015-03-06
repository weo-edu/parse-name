# parse-name

Parses a human name into `title`, `first`, and `last` components.

## Usage

### parse

```javascript
var parse = require('parse-name').parse;

user.name = parse('Mr. John Smith');
user.save();
```

### compose

```javascript
var compose = require('parse-name').compose;

var name = compose(user.name);
alert("Your name is " + name);
```

#### Options

* `respectful` - use <title> <last> E.g. 'Mr. Smith'.  Falls back to 'John Smith' if no title is present.
* `full` - use <title> <first> <last> E.g. 'Mr. John Smith'.  Any missing components will be left out

## Example

```javascript
var parse = require('parse-name').parse;

var name = parse('Mr. Smith');
assert.equal(name.title, 'Mr.');
assert.equal(name.first, '');
assert.equal(name.last, 'Smith');

name = parse('John Smith');
assert.equal(name.title, '');
assert.equal(name.first, 'John');
assert.equal(name.last, 'Smith');

name = parse('Mr. John Smith');
assert.equal(name.title, 'Mr.');
assert.equal(name.first, 'John');
assert.equal(name.last, 'Smith');
```

### Custom Titles

```javascript
var parse = require('parse-name').parse;

var name = parse('Prof. Smith', ['Prof.']);
assert.equal(name.title, 'Prof.');
assert.equal(name.first, '');
assert.equal(name.last, 'Smith');
```

### Compose Name

```javascript
var compose = require('parse-name').compose;

var components = {first: 'John', last: 'Smith', title: 'Mr.'};
assert.equal(compose(components), 'John Smith');
assert.equal(compose(components, {respectful: true}), 'Mr. Smith');
```