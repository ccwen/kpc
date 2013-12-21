/*
https://github.com/shama/gruntfile
*/
var generatedJSFiles=[];

module.exports =require('gruntfile')(function(grunt) {
	var nw=require('./node_script/grunt-nw');
    var newcomponent=require('./node_script/newcomponent');

    grunt.initConfig({
    	'shell': {
            'runnw': {
                command: nw.bin+" --remote-debugging-port=9222 .",
                options: {
                    async:true,
                    stdout: true
                }        		
            },
            'component-build':{
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
                tasks: ['build'],
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
            'jsx2js': {
                files: [{
                    expand: true,
                    cwd: 'components',
                    src: ['**/*.jsx'],
                    dest: 'components',
                    ext:'.js'
                }]
            }
        },
        'taskHelper': {
            'getJSX':{
                options:{
                    handlerByFileSrc: function(src, dest, options) {
                        generatedJSFiles.push(dest)
                    },
                    async:false
                },  
                expand: true,
                cwd: 'components',
                src: ['**/*.jsx'],
                dest: 'components',
                ext:'.js'
            }
        },

    });
    grunt.loadNpmTasks('grunt-git');  

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-task-helper');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask('removeintermediateJS','Delete Intermediate JS',function(){
        var fs=require('fs')
        for (var i in generatedJSFiles) {
            fs.unlink(generatedJSFiles[i])
        }
    });

    grunt.registerTask('build', 
        ['taskHelper:getJSX', 
        'react:jsx2js',      
        'shell:component-build', 
        'uglify',            
        'removeintermediateJS']);

    grunt.registerTask('runmessage','',function(){
        console.log('ctrl+C to quit')
    });
    grunt.registerTask('run', ['build','shell:runnw','runmessage','watch']);

    
    grunt.registerTask('newcomponent','',function(){
        var name = grunt.option('name');
        newcomponent(name);
    });
    

});