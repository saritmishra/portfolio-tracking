var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var assert = require('assert');
var bodyParser = require('body-parser');

var db = monk('mongodb://internaladmin:sarit@ds047355.mongolab.com:47355/portfoliotracking');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

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

app.post('/script', function(req, res) {
    var db = req.db;
    var collection = db.get('data');
    collection.insert(req.body, function(err, result) {
        if (err === null) {
            res.status(201).send({msg: 'Success created'});
        } else {
            res.send({msg: err});
        }
    });
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
