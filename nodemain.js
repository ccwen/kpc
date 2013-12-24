/* this file must be first line in index.html script tag*/
if (typeof process !='undefined' &&process.versions['node-webkit']) {
	nodeRequire=require;
  require("../node_script/watch.js");
}
