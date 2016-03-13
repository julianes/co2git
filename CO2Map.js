$(function ljgy(sel){

	$(function(){
		$(".container1").mapael({
			map : {
				// Set the name of the map to display
				name : "world_countries",
			},
			
			areas: {
			  "DE": {
				  attrs: {
					fill: "#FF0000"
				  },
				  attrsHover: {
					fill: "#a4e100"
				  }
			  }
			}
			
		});
		//alert("Hello! I am an alert box!!"+sel.value);
	});
 
});


$('#countries').change(function () {
	var valx='"Value"';
	var country=$(this).val();
	var colors ={};

	colors[country]={
				  attrs: {
					fill: "#00FF00"
				  },
				  attrsHover: {
					fill: "#a4e100"
				  }
	};
     $(function(){	

		$(".container1").mapael({
			map : {
				// Set the name of the map to display
				name : "world_countries",
			},  
			areas: colors
		});		 
	});
    
   console.log("javascript is working");
    var Cloudant = require('cloudant');

var me = 'nodejs'; // Set this to your own account
var password = process.env.cloudant_password;

// Initialize the library with my account.
var cloudant = Cloudant("https://garzon3:juligmart@garzon3.cloudant.com");

cloudant.db.list(function(err, allDbs) {
  console.log('All my databases: %s', allDbs.join(', '))
});




});
