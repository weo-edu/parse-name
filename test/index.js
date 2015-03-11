var assert = require('assert');
var parse = require('../').parse;
var compose = require('../').compose;

describe('parse-name', function() {
  describe('parse', function() {
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

    it('should not throw an error for null/undefined name', function() {
      var name = parse(null);
      assert(name.first === '');
      assert(name.last === '');
      assert(name.title === '');
    });
  });

  describe('compose', function() {
    it('should work', function() {
      var components = {first: 'John', last: 'Smith', title: 'Mr.'};
      assert.equal(compose(components), 'John Smith');
      assert.equal(compose(components, {respectful: true}), 'Mr. Smith');
    });

    it('should fall back to first/last if there is no title, even if respectful is true', function() {
      assert.equal(compose({first: 'John', last: 'Smith'}, {respectful: true}), 'John Smith');
    });

    it('should handle empty first/last name correctly', function() {
      assert.equal(compose({last: 'Smith'}), 'Smith');
      assert.equal(compose({first: 'John'}), 'John');
      assert.equal(compose({first: 'John', title: 'Mr.'}, {respectful: true}), 'John');
    });

    it('should support the full option', function() {
      assert.equal(compose({title: 'Mr.', first: 'John', last: 'Smith'}, {full: true}), 'Mr. John Smith');
      assert.equal(compose({first: 'John', last: 'Smith'}, {full: true}), 'John Smith');
      assert.equal(compose({title: 'Mr.', first: 'John'}, {full: true}), 'Mr. John');
    });
  });
});