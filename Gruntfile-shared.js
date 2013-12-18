/*
https://github.com/shama/gruntfile
*/
module.exports =require('gruntfile')(function(grunt) {
	var nw=require('./gruntjs/grunt-nw');
	grunt.initConfig({
		'clean':{

		},
		'uglify': {
	      options: {
	        banner: '/* hi<%=grunt.template.today("yyyy-mm-dd")%>*/'
	      },
	      build: {
	        src: 'src/*.js',
	        dest: 'build/bundle.min.js'
	      }
	  },
 		'shell': {
        nw: {
            command: nw.bin,
            options: {
                stdout: true
            }        		
        },
        test:{
        	command:function() {
        		return "echo abc"+process.cwd();
        	},
        	options:{
        		stdout:true
        	}
        }
    }
  
  });
  grunt.loadNpmTasks('grunt-git');  
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-curl');
	grunt.registerTask('default', ['shell:test']);

});