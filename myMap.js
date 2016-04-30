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
//   export COUCH_DELIMITER=","
//   cat caitGHG.csv | couchimport    
//
//   https://github.com/glynnbird/couchimport

	var R,G,B;
	var highestCO2=20;
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
		$.get("/modifyDB", function (data){
			var selCountry = document.getElementById('countries');
			var selCountry2 = document.getElementById('countries2');
			var colors ={};
			// Consult data brought from database

			data.rows.forEach(function(doc){ // GET GHG values from server and store them in each country
				
				// colors[doc.value.nameID]={ // "name" is the nameID of country in the database
				//   attrs: {
				// 	fill: getColor(doc.value.ghg) //ghg is the co2 per capita of that country from db
				//   },
				//   attrsHover: {
				// 	fill: "#a4e100"
				//   },
				//   tooltip: {content : "<span style=\"font-weight:bold;\">" + doc.value.name + "</span><br />" + parseFloat(doc.value.ghg).toFixed(2) + " Tons"},
				// };
				
				// Fill select list with countries	
				var opt = document.createElement("option");
			    opt.value = doc.value.name;
			    opt.innerHTML = doc.value.name;
			    selCountry.appendChild(opt);

			    var opt2 = document.createElement("option");
			    opt2.value = doc.value.name;
			    opt2.innerHTML = doc.value.name;
			    selCountry2.appendChild(opt2);

			});

			// Print map
			$(".container1").mapael({
				map : {
					name : "world_countries",
				},  
				//areas: colors
			});		 
		});
		
		//scroll message off
		document.getElementById('scroll-msg').style.visibility='hidden'; 
		document.getElementById('scroll-msg2').style.visibility='hidden'; 	 	
		
	});


	$('#countries').change(function () {
		var colors ={};
	    //alert("toggle ejecutado!!");		
	
		 //$.post("/modifyDB");   // EXECUTES THE MODIFICATION OF DB FROM MAP!!!!  
		 $.get("/modifyDB", function (data){
		 	
							var elSel = document.getElementById('countries'); // Value from Select option in HTML	
							data.rows.forEach(function(doc){ // GET GHG values from server and store them in each country

								if (elSel.value == doc.value.name){ // Highlight selected item (country)
									colors[doc.value.nameID]={ // "name" is the nameID of country in the database
										  attrs: {
											fill: "#332233"	
										  }, 
										  attrsHover: {
											fill: getColor(doc.value.ghg)
										  },
										  tooltip: {content : "<span style=\"font-weight:bold;\">" + doc.value.name + "</span><br />" + parseFloat(doc.value.ghg).toFixed(2) + " Tons"},			
									};

									// print map with single country, transition for time delay, we could delete these if we dont want delay	
									$(function(){	
										$(".container1").mapael({
											map : {
												// Set the name of the map to display
												name : "world_countries",
											},  
											areas : colors[doc.value.nameID] 
										});		 
									});

								}else{

									colors[doc.value.nameID]={ // "name" is the nameID of country in the database
									  attrs: {
										fill: getColor(doc.value.ghg) //ghg is the co2 per capita of that country from db
									  }, 
									  attrsHover: {
										fill: "#a4e100"
									  },
									  tooltip: {content : "<span style=\"font-weight:bold;\">" + doc.value.name + "</span><br />" + parseFloat(doc.value.ghg).toFixed(2) + " Tons"},
									};

								}	
									//console.log(colors[doc.value.name].attrs.fill);
							});

							$(function(){	
								setTimeout(function() {

									$(".container1").mapael({
										map : {
											// Set the name of the map to display
											name : "world_countries",
										},  
										areas: colors,
								//		legend: legends

										plots : {
											'paris' : {
												latitude :48.86, 
												longitude :2.3444, 
												tooltip: {content : "Paris<br />Population: 500000000"}
											},
											'newyork' : {
												latitude :40.667, 
												longitude :-73.833, 
												tooltip: {content : "New york<br />Population: 200001"}
											},
									        'sanfrancisco' : {
												latitude: 37.792032,
												longitude: -122.394613,
												tooltip: {content : "San Francisco"}
											},
											'brasilia' : {
												latitude :-15.781682, 
												longitude :-47.924195, 
												tooltip: {content : "Brasilia<br />Population: 200000001"}
											},
											'roma': {
												latitude :41.827637, 
												longitude :12.462732, 
												tooltip: {content : "Roma"}
											},
									        'miami' : {
												latitude: 25.789125,
												longitude:  -80.205674,
												tooltip: {content : "Miami"}
											},
									        
									        // Size=0 in order to make plots invisible
											'tokyo': {
												latitude :35.687418, 
												longitude :139.692306, 
												size:0,
									            text : {content : 'Tokyo'}
											},
											'sydney' : {
												latitude :-33.917, 
												longitude :151.167,
									            size:0,
									            text : {content : 'Sydney'}
											},
											'plot1': {
									            latitude :22.906561, 
												longitude :86.840170, 
									            size:0,
									            text : {content : 'Plot1', position : 'left', margin:5}
											},
											'plot2': {
									            latitude :-0.390553, 
												longitude :115.586762, 
									            size:0,
									            text : {content : 'Plot2'}
											},
											'plot3': {
									            latitude :44.065626, 
												longitude :94.576079, 
									            size:0,
									            text : {content : 'Plot3'}
											}
										},
									    // Links allow you to connect plots between them
									    links: {
									        'link1' : {
									            factor : -0.3
									            // The source and the destination of the link can be set with a latitude and a longitude or a x and a y ...
									            , between : [{latitude : 24.708785, longitude : -5.402427}, {x : 560, y : 280}]
									            , attrs : {
									                "stroke-width" : 2
									            }
									            , tooltip: {content : "Link"}
									        }
									        , 'parisnewyork' : {
									            // ... Or with IDs of plotted points
									            factor : -0.3
									            , between : ['paris', 'newyork']
									            , attrs : {
									                "stroke-width" : 2
									            }
									            , tooltip: {content : "Paris - New-York"}
									        }
									        , 'parissanfrancisco' : {
									            // The curve can be inverted by setting a negative factor
									            factor : -0.5
									            , between : ['paris', 'sanfrancisco']
									            , attrs : {
									                "stroke-width" : 4
									            }
									            , tooltip: {content : "Paris - San - Francisco"}
									        }
									        , 'parisbrasilia' : {
									            factor : -0.8
									            , between : ['paris', 'brasilia']
									            , attrs : {
									                "stroke-width" : 1
									            }
									            , tooltip: {content : "Paris - Brasilia"}
									        }
									        , 'romamiami' : {
									            factor : 0.2
									            , between : ['roma', 'miami']
									            , attrs : {
									                "stroke-width" : 4
									            }
									            , tooltip: {content : "Roma - Miami"}
									        }
									        , 'sydneyplot1' : {
									            factor : -0.2
									            , between : ['sydney', 'plot1']
									            , attrs : {
									                stroke: "#a4e100",
									                "stroke-width" : 3,
									                "stroke-linecap":"round",
									                opacity:0.6
									            }
									            , tooltip: {content : "Sydney - Plot1"}
									        }
									        , 'sydneyplot2' : {
									            factor : -0.1
									            , between : ['sydney', 'plot2']
									            , attrs : {
									                stroke: "#a4e100",
									                "stroke-width" : 8,
									                "stroke-linecap":"round",
									                opacity:0.6
									            }
									            , tooltip: {content : "Sydney - Plot2"}
									        }
									        , 'sydneyplot3' : {
									            factor : 0.2
									            , between : ['sydney', 'plot3']
									            , attrs : {
									                stroke: "#a4e100",
									                "stroke-width" : 4,
									                "stroke-linecap":"round",
									                opacity:0.6
									            }
									            , tooltip: {content : "Sydney - Plot3"}
									        }
									        , 'sydneytokyo' : {
									            factor : 0.2
									            , between : ['sydney', 'tokyo']
									            , attrs : {
									                stroke: "#a4e100",
									                "stroke-width" : 6,
									                "stroke-linecap":"round",
									                opacity:0.6
									            }
									            , tooltip: {content : "Sydney - Plot2"}
									        }
									    }



									});		 
								}, 0);		// time delay (if wanted)
							});

							document.getElementById('scroll-msg').style.visibility='visible';
							document.getElementById('scroll-msg2').style.visibility='visible'; 	 	

							// draw Table with results
							google.charts.load('current', {'packages':['table']});
							  google.charts.setOnLoadCallback(drawTable);

							  function drawTable() {
							    var data = new google.visualization.DataTable();
							    data.addColumn('string', 'Destination');
							    data.addColumn('number', 'Round trip (Tons of C02)');
							    data.addColumn('boolean', 'Living impact (Tons of CO2/month)');
							    data.addRows([
							      ['Mike',  {v: 10000, f: '$10,000'}, true],
							      ['Jim',   {v:8000,   f: '$8,000'},  false],
							      ['Alice', {v: 12500, f: '$12,500'}, true],
							      ['Bob',   {v: 7000,  f: '$7,000'},  true]
							    ]);

							    var table = new google.visualization.Table(document.getElementById('table_div'));

							    table.draw(data, {showRowNumber: true, width: '50%', height: '100%'});
							  }	

		 	}
		 );
		 console.log("HERE3");
	});

// Slide Button - Add another maps
$('button').on('click', function(){
    $('#slider').toggleClass('open');
    		$.get("/modifyDB", function (data){
    					data.rows.forEach(function(doc){ // GET GHG values from server and store them in each country
										
					});
    		});
});



  

