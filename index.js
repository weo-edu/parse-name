var defaultTitles = ['Mrs.', 'Ms.', 'Mr.', 'Dr.'];

module.exports = function(name, titles) {
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

module.exports.titles = defaultTitles;