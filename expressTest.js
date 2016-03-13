//http://wern-ancheta.com/blog/2015/04/26/getting-started-with-couchdb-in-node-dot-js/
//http://guide.couchdb.org/editions/1/en/why.html

var express = require("express"); // it already includes the http server
var app     = express();
var path    = require("path");
var dbTest   = require("./dbTest");
 

var nano = require('nano')('http://localhost:5984'); // couchdb link
var test_db = nano.db.use('countries_co2');
test_db.update = function(obj, key, callback){
 var db = this;
 db.get(key, function (error, existing){ 
    if(!error) obj._rev = existing._rev;
    db.insert(obj, key, callback);
 });
}





app.get('/',function(req,res){ // include the html sources
  res.sendFile(path.join(__dirname+'/CO2Map.html'));
});


// var data2 = { 
//     name: 'pikachu4', 
//     skills: ['thunder bolt', 'iron tail', 'quick attack', 'mega punch'], 
//     type: 'electric', 
//     color: '#FF0000'
// };


// test_db.update(data2, '96825cbdff8688ddc1a84d602500238a', function(err, res){
//             if(!err){
//                 //document has been updated
//             }
//         });  

dbTest.importDB(test_db);
app.use(express.static(__dirname + '/')); // enable subdirectories for js sources in html
app.listen(3000);

console.log("Running at Port 3000");