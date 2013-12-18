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
                files: ['**/*.js','**/*.css','!build/build.js'],
                tasks: ['shell:rebuild'],
                options: {
            
                },
            },
        }
  
  });
  grunt.loadNpmTasks('grunt-git');  
  grunt.registerTask('info','showinfo',function(){
        console.log('watch')
  })
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-curl');
    //grunt.registerTask('default', ['shell:run']);
    grunt.registerTask('run', ['shell:run','watch']);
});