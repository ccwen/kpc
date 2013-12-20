/*
https://github.com/shama/gruntfile
*/
module.exports =require('gruntfile')(function(grunt) {
	var nw=require('./gruntjs/grunt-nw');
	grunt.initConfig({
		'clean':{

		},
 		'shell': {
            'run': {
                command: nw.bin+" --remote-debugging-port=9222 .",
                options: {
                    async:true,
                    stdout: true
                }        		
            },
            'test':{
            	command:function() {
            		return "echo abc"+process.cwd();
            	},
            	options:{
            		stdout:true
            	}
            },
            'rebuild':{
                command: 'component build',
                options:{
                    stdout:true,
                }
            }
        },
        'watch': {
            scripts: {
                files: ['./index.html','./index.js','**/*.jsx',
                '**/*.css','!build/build.js','!build/build.min.js','!build/build.css'],
                tasks: ['rebuild'],
                options: {
            
                },
            },
        },
        'uglify':{
            build: {
                files: {
                    'build/build.min.js': ['build/build.js']
                }
            }
        },
        'react':{
            'dynamic_mappings': {
                files: [
                    {
                      expand: true,
                      cwd: 'components',
                      src: ['**/*.jsx'],
                      dest: 'components',
                      ext: '.js'
                    }
                ]
            }
        }
  
  });
  grunt.loadNpmTasks('grunt-git');  
  grunt.registerTask('info','showinfo',function(){
        console.log('watch')
  })
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-react');
    grunt.registerTask('rebuild', ['react:dynamic_mappings','shell:rebuild','uglify']);
    grunt.registerTask('run', ['rebuild','shell:run','watch']);
});