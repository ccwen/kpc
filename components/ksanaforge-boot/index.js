React=require('../react');
Require=function(arg){return require("../"+arg)};
React.renderComponent(require("../main")(),document.getElementById("main"));