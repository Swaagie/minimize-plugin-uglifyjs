'use strict';

var uglifyjs = require('uglify-js');

//
// Unique ID to identify the plugin.
//
exports.id = 'uglifyjs';

//
// Minify the JS with uglify JS.
//
exports.element = function plugin(element, done) {
  var content, code
    , options = uglifyjs.defaults({
        fromString: true,
        compress: {},
        mangle: {}
      });

  //
  // 1. parse
  //
  content = uglifyjs.parse(element.data, options);

  //
  // 2. compress
  //
  content.figure_out_scope();
  options.compress.screw_ie8 = true;
  options.compress.warnings = false;
  content = content.transform(uglifyjs.Compressor(options.compress));

  //
  // 3. mangle
  //
  options.mangle.screw_ie8 = true;
  content.figure_out_scope(options.mangle);
  content.compute_char_frequency(options.mangle);
  content.mangle_names(options.mangle);

  //
  // 4. output
  //
  code = uglifyjs.OutputStream();
  content.print(code);

  done(undefined, ''+ code);
};