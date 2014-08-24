'use strict';

module.exports = function(grunt) {
  var file = grunt.option('file');
  var dir = grunt.option('dir');
  grunt.initConfig({
    haml: {
      html: {
        files: [{
          expand: true,
          cwd: dir,
          src: [file],
          dest: 'html',
          flatten: true,
          ext: '.html',
          extDot: 'last'
        }]     
      }
    },
    ngtemplates: {
      app: {
        src: "html/*.html",
        dest: "js/templates.js",
        options: {
          prefix: "/",
          module: "app",
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.registerTask('default', ['ngtemplates']);
};

