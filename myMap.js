// GIT>>git add --all
//		git commit -m "second update"
//		git push

// DATA SOURCES OF GHG

// 1. excel export data:
//  http://www.wri.org/resources/data-sets/cait-country-greenhouse-gas-emissions-data

// 2. Diagram of data:
//http://knoema.com/EIAIES2015Jun/international-energy-statistics-january-2016?tsId=1354980

// 3. Import CSV data in CouchDB
//   export COUCH_DATABASE="mydatabase"
//   export COUCH_URL="http://julianes:juli@localhost:5984"
//   export COUCH_TRANSFORM="/home/julian/Downloads/mapaer/jQuery-Mapael-1.1.0/transform.js"
//   cat caitGHG.csv | couchimport    
//
//   https://github.com/glynnbird/couchimport

	var R,G,B;
	var highestCO2=30;
	function getColor(n){  // returns the corresponding color according n = CO2 per capita
			R = (255 * n) / highestCO2;  // country with maximum CO2 has 62.5 tons
			G = (255 * (highestCO2 - n)) / highestCO2 ;
			B = '00';
			if (R>255){R=255;}
			if (G>255){G=255;}
			if (R<0){R=0; B="FF"; G="00"}
			if (G<0){G=0;}

			R=Math.floor(R).toString(16);
			G=Math.floor(G).toString(16);
			if (R.length < 2){R="0"+R;}
			if (G.length < 2){G="0"+G;}
			if (R==0){R='00';}
			if (G==0){G='00';}
			var strHex = "#"+R+G+B;
			//console.log("#"+ R + "," + G + "," + B);
			return strHex;
	}

		$(function (){

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
			
			});
		});

		$('#countries').change(function () {
			//var country=$(this).val();
			var colors ={};
			
		    //alert("toggle ejecutado!!");		
		

			 //$.post("/modifyDB");   // EXECUTES THE MODIFICATION OF DB FROM MAP!!!!  
			 $.get("/modifyDB", function (data){
			 	
					 	 switch(2) {
						    case 1:
						
						    	console.log("Data: " + data); // level of CO2 of certain country
								//querystring.parse(date)["data2"];
								var strHex = getColor(data);
								console.log("String RGB: " + strHex);	


								colors["CO"]={
									  attrs: {
										fill: strHex // data Brought from Server!!!!
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

						    break;
						    case 2:
						    	 
								// var colorsAll = '{"jsonArray":[{"teamId":"hola"}]}'; // json containing colors for all countries	
								// var obj = JSON.parse(colorsAll);
								// obj["jsonArray"].push({"teamId":"hola2"});
								// var stringReady=JSON.stringify(obj.jsonArray);
								// stringReady = stringReady.substring(1, stringReady.length - 1);
								// console.log(stringReady);	
								
								data.rows.forEach(function(doc){ // GET GHG values from server and store them in each country
										colors[doc.value.nameID]={ // "name" is the nameID of country in the database
										  attrs: {
											fill: getColor(doc.value.ghg) //ghg is the co2 per capita of that country from db
										  },
										  attrsHover: {
											fill: "#a4e100"
										  },
										  tooltip: {content : "<span style=\"font-weight:bold;\">" + doc.value.name + "</span><br />" + parseFloat(doc.value.ghg).toFixed(2) + " Tons"},
										  

										};

										//console.log(colors[doc.value.name].attrs.fill);

								});

								//console.log(JSON.stringify(colors));

								$(function(){	
									$(".container1").mapael({
										map : {
											// Set the name of the map to display
											name : "world_countries",
										},  
										areas: colors
								//		legend: legends
									});		 
								});

						    break;

						    default:
						    break;
						}		
			 	}
			 );
			 console.log("HERE3");
    	});





$('button').on('click', function(){
    $('#slider').toggleClass('open');
    		$.get("/modifyDB", function (data){
    					data.rows.forEach(function(doc){ // GET GHG values from server and store them in each country
										
					});
    		});
});