var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://internaladmin:sarit@ds047355.mongolab.com:47355/portfoliotracking');
var assert = require('assert');

app.use(express.static(__dirname + '/'));

// Make our db accessible to our router
app.use(function(req,res,next){
	req.db = db;
	next();
});

 app.get('/filedata', function(request, response) {
   var readable = fs.createReadStream(path.join(__dirname, 'data/data.json'));
	 readable.pipe(response);
 });

app.get('/data', function(req, res) {
	var db = req.db;
	var collection = db.get('data');
	collection.find({}, {}, function(e, docs) {
		res.json(docs);
	});
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
