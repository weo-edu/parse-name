var assert = require('assert');
var parse = require('../').parse;
var compose = require('../').compose;

describe('parse-name', function() {
  it('should work', function() {
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
  });

  it('should work with multiple last names', function() {
    var name = parse('Vincent Van Gogh');

    assert.equal(name.first, 'Vincent');
    assert.equal(name.last, 'Van Gogh');
  });

  it('should allow custom titles', function() {
    var name = parse('Prof. Smith', ['Prof.']);

    assert.equal(name.title, 'Prof.');
    assert.equal(name.first, '');
    assert.equal(name.last, 'Smith');
  });

  it('should compose names correctly', function() {
    var components = {first: 'John', last: 'Smith', title: 'Mr.'};
    assert.equal(compose(components), 'John Smith');
    assert.equal(compose(components, {respectful: true}), 'Mr. Smith');
  });
});