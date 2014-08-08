var PLUGIN_NAME, PluginError, replaceExtension, through, _ref;
through = require('through2');
_ref = require('gulp-util'), PluginError = _ref.PluginError, replaceExtension = _ref.replaceExtension;
PLUGIN_NAME = 'gulp-replace-line';
module.exports = function(regexp, replacer) {
  var eachLine, list;
  eachLine = Array.isArray(regexp) ? (list = regexp, function(line) {
    var _i, _len, _ref1;
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      _ref1 = list[_i], regexp = _ref1[0], replacer = _ref1[1];
      line = line.replace(regexp, replacer);
    }
    return line;
  }) : function(line) {
    return line.replace(regexp, replacer);
  };
  return through.obj(function(file, enc, callback) {
    var contents;
    if (file.isNull()) {
      return callback();
    }
    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Not supports Stream');
    }
    if (!file.isBuffer()) {
      throw new PluginError(PLUGIN_NAME, 'Supports Buffer only');
    }
    contents = file.contents.toString('utf8');
    contents = contents.replace(/.*\r?\n|.*$/g, eachLine);
    file.contents = new Buffer(contents);
    this.push(file);
    return callback();
  });
};
