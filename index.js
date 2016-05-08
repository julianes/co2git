//Definition of Subjects (not verbs)
var server = require("./server"); // file server.js in same directory. FUnction iniciar is defined there
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {} // it is an array of javascript objects, that means: Name and Value. 
handle["/"] = requestHandlers.co2; // Name: "/"   -     Value:"requestHandlers.iniciar" (a function)
handle["/iniciar"] = requestHandlers.iniciar;
handle["/subir"] = requestHandlers.subir;
handle["/co2"] = requestHandlers.co2;
handle["/addJS"] = requestHandlers.addJS;
handle["/addPNG"] = requestHandlers.addPNG;
handle["/modifyDB"] = requestHandlers.modifyDB;
//handle["/dbHandle"] = requestHandlers.dbHandle;

server.iniciar(router.route, handle); // verbs are passed as parameters. Server is running with all the programmed services (HTTP, FTP, SQL...). 
									  // Handle is a local variable -> then it is passed as parameter	





