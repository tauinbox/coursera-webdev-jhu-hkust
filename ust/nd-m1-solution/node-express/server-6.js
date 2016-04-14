var express = require('express');
var morgan = require('morgan');
var resourceRouter = require('./resourceRouter');


var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

resourceRouter(app, 'dish', 'dishes', function(err, routes) {
  if (err) {
    console.log(err);
  }
  else {
    routes.initroutes();
  }
});

resourceRouter(app, 'promo', 'promotions', function(err, routes) {
  if (err) {
    console.log(err);
  }
  else {
    routes.initroutes();
  }
});

resourceRouter(app, 'leader', 'leadership', function(err, routes) {
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