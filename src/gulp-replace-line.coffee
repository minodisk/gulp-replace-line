through = require 'through2'
{ PluginError, replaceExtension } = require 'gulp-util'

PLUGIN_NAME = 'gulp-replace-line'

module.exports = (regexp, replacer) ->
  eachLine = if Array.isArray regexp
    list = regexp
    (line) ->
      for [ regexp, replacer ] in list
        line = line.replace regexp, replacer
      line
  else
    (line) ->
      line.replace regexp, replacer

  through.obj (file, enc, callback) ->
    return callback() if file.isNull()
    throw new PluginError PLUGIN_NAME, 'Not supports Stream' if file.isStream()
    throw new PluginError PLUGIN_NAME, 'Supports Buffer only' unless file.isBuffer()

    contents = file.contents.toString 'utf8'
    contents = contents.replace /.*\r?\n|.*$/g, eachLine
    file.contents = new Buffer contents
    @push file

    callback()
