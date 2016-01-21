var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));

 app.get('/data', function(request, response) {
   var readable = fs.createReadStream(path.join(__dirname, 'data/data.json'));
	 readable.pipe(response);
 });

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
