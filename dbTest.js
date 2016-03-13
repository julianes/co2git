var jsdom = require("jsdom");
var $ = require("jquery")(jsdom.jsdom().parentWindow); 
var url = require('url');





function importDB(test_db) {
		
var data2 = { 
    name: 'pikachu7', 
    skills: ['thunder bolt', 'iron tail', 'quick attack', 'mega punch'], 
    type: 'electric', 
    color: '#FF0000'
};


test_db.update(data2, '96825cbdff8688ddc1a84d602500238a', function(err, res){
            if(!err){
                //document has been updated
            }
        });  



test_db.get('96825cbdff8688ddc1a84d602500238a', function(err, body) {
  if (!err) {
    console.log(body);
  }
});

  console.log("peticion de DB ejecutada");


}

exports.importDB = importDB;