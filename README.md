# parse-name

Parses a human name into `title`, `first`, and `last` components.

## Example

```javascript
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
var name = parse('Prof. Smith', ['Prof.']);

assert.equal(name.title, 'Prof.');
assert.equal(name.first, '');
assert.equal(name.last, 'Smith');
```
