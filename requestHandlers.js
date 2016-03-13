var querystring = require("querystring");
var fs = require("fs");

function iniciar(response, postData) {
  console.log("Manipulador de peticiones 'iniciar' fue llamado.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html           	charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/subir" method="post">'+   // this connects the Button with the new webpage '/subir'
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Enviar texto" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body); // send the HTML
    response.end();
}

function subir(response, dataPosteada) {
 console.log("Manipulador de Peticion 'subir' fue llamado.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Tu enviaste: " + 
  querystring.parse(dataPosteada)["text"]); // parse the data in dataPosteada till we get the text we just wrote
  response.end();
}

function co2(response, dataPosteada) {  // Loads HTML sources
  console.log("Manipulador de peticiones 'co2' fue llamado.");
  response.writeHead(200, {"Content-Type": "text/html"});
  fs.createReadStream('CO2Map.html').pipe(response);
}

function addJS(res, dataPosteada, pathname) { // adds Javascript sources
    console.log("Getting file " + pathname +"...");
    fs.readFile('.'+pathname, function (err,content){
        if (err){
           res.writeHead(500);
           res.end();
        }else {
          res.writeHead(200,{"Content-Type": "text/javascript"});
          res.end(content);
        }
    }
  );
}

function modifyDB(res, dataPosteada,test_db) {
        // var data2 = { 
        //     name: 'pikachu30', 
        //     skills: ['thunder bolt', 'iron tail', 'quick attack', 'mega punch'], 
        //     type: 'electric', 
        //     color: '#FF0000'
        // };


        // test_db.update(data2, '96825cbdff8688ddc1a84d602500238a', function(err, res){
        //             if(!err){
        //             }
        //         });  


     switch(2) {
        case 1: // working script
        
        test_db.get('3b25f55e7abb32adcea6ee7e620e5e96', function(err, body) { // VALUE OF DOCUMENT ID
            if (!err) {
              console.log(body); // TODO: analize "body" and extract color of data in db
              console.log("DATA FROM DB: " + body["GHGincluding"]);            

              console.log("peticion de DB ejecutada");
    
              res.writeHead(200, {"Content-Type": "text/html"});
              res.write(body["GHGincluding"]);
              res.end();
            }
        });

        break;

        case 2: // Testing script
        
        test_db.view('allGHG', 'view_allGHG', function(err, body){ // design and view name in couchdb (Futon)
            if (!err) {
              console.log("************allGHG VIEW************");
              
              // body.rows.forEach(function(doc) {
              //   console.log(doc.value);
              // });

               res.writeHead(200, {"Content-Type": "application/json"});
               res.write(JSON.stringify(body));
               res.end();
            }
        });            

        break;
        
        default:
            
    }
}

exports.modifyDB = modifyDB;
exports.iniciar = iniciar;
exports.subir = subir;
exports.co2 = co2;
exports.addJS = addJS;