
module.exports = function(grunt) {
  // Project configuration.
  var nw=require('./gruntjs/grunt-nw');
  var colors = require('colors');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'curl': {
      'node-webkit':{
        src:nw.precompile,
        dest:nw.zip
      },
    },
    'unzip':{
      'node-webkit': {
        src : nw.zip,
        dest: nw.path
      }
    },

    'clean' : {
      'yase':{
        src:['node_modules/yase']
      }
    },

    'gitclone' : {
      'yase': {
        options:{
          repository: 'https://github.com/yapcheahshen/yase.git',
          branch: 'master',
          directory: 'node_modules/yase',
          force:true   
        }
      }

    },


    'uglify': {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-git');

  // Default task(s).
  grunt.registerTask('info', 'install information',function(){
    console.log('nw',nw);
  } );

  grunt.registerTask('default', ['uglify']);

  //grunt-unzip is too slow !!!
  grunt.registerTask('unzip-nw','Unziping ',function(g){
    require('./gruntjs/grunt-unpack')(nw);
  });

  grunt.registerTask('installnw', ['curl:node-webkit','unzip-nw']);
  grunt.registerTask('clone', ['clean:yase','gitclone:yase']);


};