module.exports = function(app, callback) {

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
          res.end('Will send all the leadership to you!');
        })

        .post(function(req, res, next) {
          res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);    
        })

        .delete(function(req, res, next) {
          res.end('Deleting all leadership');
        });

        expressRouter.route('/:id')
        .all(function(req, res, next) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          next();
        })

        .get(function(req, res, next) {
          res.end('Will send details of the leader: ' + req.params.id +' to you!');
        })

        .put(function(req, res, next) {
          res.write('Updating the leader: ' + req.params.id + '\n');
          res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
        })

        .delete(function(req, res, next){
          res.end('Deleting leader: ' + req.params.id);
        });

        app.use('/leadership', expressRouter);

      }
    });

  }
  catch(error) {
    callback(error, null);
  }
};