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
    }
  });
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.registerTask('default', ['haml']);
};

