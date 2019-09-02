var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    res.send('<h>Hi</h>')
});

var server = app.listen(
    app.get('port'), function() {
        console.log(" Listening to port " + app.get('port'));
    });