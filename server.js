var http = require("http"); //http server included in NODEJS
var url = require("url"); // url petitions (requests) must be answered with "response" (this is included in NODEJS)
var path = require('path');
//var dbserver = require('./dbserver');


function iniciar(route, handle) { // This "iniciar" belongs to server Only (from definition in index)
  
      // STARTING COUCHDB server
      var nano = require('nano')('http://localhost:5984'); // couchdb link
          var test_db = nano.db.use('mydatabase'); // NAME OF DATABASE
          test_db.update = function(obj, key, callback){
           var db = this;
           db.get(key, function (error, existing){ 
              if(!error) obj._rev = existing._rev;
              db.insert(obj, key, callback);
           });
          }

    // HTTP SERVER / DATA EXCHANGE Server/Client
  function onRequest(request, response) { // subjects
        var dataPosteada = "";
        var pathname = url.parse(request.url).pathname; // from url defined before. Text right after after DNS.       
        console.log("Peticion para " + pathname + " recibida.");
        request.setEncoding("utf8");
        request.addListener("data", function(trozoPosteado) {//callback "data"
          dataPosteada += trozoPosteado; // gather all data
          console.log("Recibido trozo POST '" + trozoPosteado + "'.");
    });

    request.addListener("end", function() { //each time we hear an "end" (callback), this is executed
      route(handle, pathname, response, dataPosteada,test_db); // pass all Data gathered (dataPosteada)
    });

  }

  http.createServer(onRequest).listen(8888);// function onRequest() is passed as parameter to listen
  console.log("Servidor Iniciado");
}

exports.iniciar = iniciar; // we export this function to be used in NODEJS. This is an analogy to modules like http in NODEJS
