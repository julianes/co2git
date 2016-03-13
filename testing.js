
    console.log("javascript is working");
    var Cloudant = require('cloudant');

var me = 'nodejs'; // Set this to your own account
var password = process.env.cloudant_password;

// Initialize the library with my account.
var cloudant = Cloudant("https://garzon3:juligmart@garzon3.cloudant.com");

cloudant.db.list(function(err, allDbs) {
  console.log('All my databases: %s', allDbs.join(', '))
});

  