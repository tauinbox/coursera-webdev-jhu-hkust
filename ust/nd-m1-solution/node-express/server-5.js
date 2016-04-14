var express = require('express');
var morgan = require('morgan');
var dishRouter = require('./dishRouter');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

dishRouter(app, function(err, routes) {
  if (err) {
    console.log(err);
  }
  else {
    routes.initroutes();
  }
});  

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});