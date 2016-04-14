module.exports = function(app, single, plural, callback) {

  try {
    callback(null, {
      initroutes: function() {
        var express = require('express');
        var bodyParser = require('body-parser');
        var expressRouter = express.Router();

        expressRouter.use(bodyParser.json());

        expressRouter.route('/')
        .all(function(req, res, next) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          next();
        })

        .get(function(req, res, next) {
          res.end('Will send all the ' + plural + ' to you!');
        })

        .post(function(req, res, next) {
          res.end('Will add the '+ single + ': ' + req.body.name + ' with details: ' + req.body.description);    
        })

        .delete(function(req, res, next) {
          res.end('Deleting all ' + plural);
        });

        expressRouter.route('/:id')
        .all(function(req, res, next) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          next();
        })

        .get(function(req, res, next) {
          res.end('Will send details of the '+ single +': ' + req.params.id +' to you!');
        })

        .put(function(req, res, next) {
          res.write('Updating the '+ single +': ' + req.params.id + '\n');
          res.end('Will update the '+ single +': ' + req.body.name + ' with details: ' + req.body.description);
        })

        .delete(function(req, res, next){
          res.end('Deleting '+ single +': ' + req.params.id);
        });

        app.use('/' + plural, expressRouter);

      }
    });

  }
  catch(error) {
    callback(error, null);
  }
};