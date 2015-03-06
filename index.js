var defaultTitles = ['Mrs.', 'Ms.', 'Mr.', 'Dr.'];

exports.parse = function(name, titles) {
  titles = titles || defaultTitles;

  var parts = name.split(' ');
  var components = {title: '', first: '', last: ''};

  if(titles.indexOf(parts[0]) !== -1) {
    components.title = parts.shift();
    // <title> <last_name>
    if(parts.length === 1) {
      components.last = parts.shift();
      return components;
    }
  }

  if(parts.length)
    components.first = parts.shift();
  if(parts.length)
    components.last = parts.join(' ');

  return components;
};

exports.compose = function(components, opts) {
  opts = opts || {};

  var first = opts.respectful ? components.title : components.first;
  return first + ' ' + components.last;
};

module.exports.titles = defaultTitles;