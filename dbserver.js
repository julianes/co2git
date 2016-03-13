//   HOST="http://julianes:juli@127.0.0.1:5984"
//   curl -X PUT http://julianes:juli@localhost:5984/demo

		var nano = require('nano')('http://localhost:5984'); // couchdb link
		var test_db = nano.db.use('countries_co2');
		test_db.update = function(obj, key, callback){
		 var db = this;
		 db.get(key, function (error, existing){ 
		    if(!error) obj._rev = existing._rev;
		    db.insert(obj, key, callback);
		 });
		}

		currentDB=test_db;

		 var data2 = { 
             name: 'pikachu13', 
            skills: ['thunder bolt', 'iron tail', 'quick attack', 'mega punch'], 
            type: 'electric', 
            color: '#FF0000'
        };


        test_db.update(data2, '96825cbdff8688ddc1a84d602500238a', function(err, res){
                    if(!err){
                    }
                });  

