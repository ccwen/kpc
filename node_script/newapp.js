module.exports=function(appname){

	var fs=require('fs');
	var getgiturl=function() {
		var url=fs.readFileSync(appname+'/.git/config','utf8');//.match(/url = (.*?)\n/);
		url=url.substr(url.indexOf('url ='),100);
		url=url.replace(/\r\n/g,'\n').substring(6,url.indexOf('\n'));
		return url;
	}
	var die=function() {
		console.log.apply(this,arguments)
		process.exit(1);
	}


	if (!appname) die('Please specifiy --name=newappname');
	if (!fs.existsSync(appname)) die('folder not exists');
	if (!fs.existsSync(appname+'/.git')) die('not a git repository');

	var Gruntfile='module.exports = function(grunt) {\n'+
	'  var colors = require("colors");\n'+
	'  var tasks = require("../Gruntfile-shared")(grunt);\n'+
	'  grunt.initConfig({\n'+
	'  });\n'+
	'}';

	
	var gitrepo=getgiturl().trim()||"";
	var componentjson=
'{\n'+
'  "name": "'+appname+'",\n'+
'  "repo": "'+gitrepo+'",\n'+
'  "description": "hello world",\n'+
'  "version": "0.0.1",\n'+
'  "keywords": [],\n'+
'  "dependencies": {\n'+
'    "ksanaforge/boot": "*",\n'+
'    "ksanaforge/kse": "*",\n'+
'    "brighthas/bootstrap": "*",\n'+
'    "component/jquery": "*"\n'+
'  },\n'+
'  "development": {},\n'+
'  "paths": ["components","../kse-ui/components","../components"],\n'+
'  "local": ["facebook/react"],\n'+
'  "license": "MIT",\n'+
'  "main": "index.js",\n'+
'  "scripts": ["index.js"],\n'+
'  "styles": ["index.css"]\n'+
'}';

	var indexjs='require("boot");'
	var indexcss='#main {}';
	var indexhtml='<html>\n'+
						'<head>\n'+
						'<script src="../nodemain.js"></script>\n'+
						'<script src="build/build.js"></script>\n'+
						'<link type="text/css" rel="stylesheet" href="build/build.css">\n'+
						'</head>\n'+
						'<div id="main"></div>\n'+
						'<script>\n'+
						'	require("'+appname+'");\n'+
						'</script>\n'+
						'</html>';
	var packagejson='{\n'+
						'  "name": "'+appname+'",\n'+
						'  "description": "New application",\n'+
						'  "version": "0.0.1",\n'+
						'  "main": "index.html",\n'+
						'  "single-instance":true,\n'+
						'  "window": {\n'+
						'    "toolbar": false,\n'+
						'    "width": 1060,\n'+
						'    "height": 700\n'+
						'  },\n'+
						' "repositories": [\n'+
						'  {\n'+
						'            "type": "git", \n'+
						'            "url": "'+gitrepo+'"\n'+
						'       }  \n'+
						'    ]\n'+
						'}';

	fs.writeFileSync(appname+'/Gruntfile.js',Gruntfile,'utf8');
	fs.writeFileSync(appname+'/component.json',componentjson,'utf8');
	fs.writeFileSync(appname+'/index.js',indexjs,'utf8');
	fs.writeFileSync(appname+'/package.json',packagejson,'utf8');
	fs.writeFileSync(appname+'/index.css',indexcss,'utf8');
	fs.writeFileSync(appname+'/index.html',indexhtml,'utf8');
	fs.mkdirSync(appname+'/components');
}