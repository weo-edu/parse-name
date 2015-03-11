var defaultTitles = ['Mrs.', 'Ms.', 'Mr.', 'Dr.'];

exports.parse = function(name, titles) {
  titles = titles || defaultTitles;

  var components = {title: '', first: '', last: ''};
  if(! name) return components;

  var parts = name.split(' ');

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
  var title = components.title;
  var first = components.first;
  var last = components.last;

  if(opts.full)
    return [title, first, last].filter(Boolean).join(' ');

  if(opts.respectful && title && last)
    return title + ' ' + last;

  if(first && last)
    return first + ' ' + last;

  return first || last || '';
};

module.exports.titles = defaultTitles;