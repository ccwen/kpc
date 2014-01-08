module.exports = function(grunt) {
  var colors = require("colors");
  var tasks = require("../Gruntfile-shared")(grunt);
  grunt.initConfig({
    'copy':{
      'buildjs':{
          expand: true, 
          cwd: 'build', 
          src: ['build.js'],
          dest: 'chrome-boilerplate/src/'
      }
     }
  });
  
  

    grunt.registerTask('build', 
        ['shell:component-build', 'copy:buildjs']);  
}