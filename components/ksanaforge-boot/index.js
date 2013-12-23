React=require('../react');
Require=function(arg){return require("../"+arg)};
mediator=new require("../mediator").Mediator(); //
React.renderComponent(require("../main")(),document.getElementById("main"));