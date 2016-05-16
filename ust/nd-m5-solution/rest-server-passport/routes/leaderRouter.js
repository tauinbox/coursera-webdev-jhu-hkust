var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Leadership = require('../models/leadership');

var Verify = require('./verify');

var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(function(req, res, next) {
  Leadership.find(req.query, function(err, leaders) {
    if (err) next(err);
    res.json(leaders);
  });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Leadership.create(req.body, function(err, leader) {
    if (err) next(err);
    console.log('Leader created!');
    var id = leader._id;

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Added the leader with id: ' + id);
  });  
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Leadership.remove({}, function(err, resp) {
    if (err) next(err);
    res.json(resp);
  });
});

//////////////////////////////////////////////

leaderRouter.route('/:id')
.get(function(req, res, next) {
  Leadership.findById(req.params.id, function(err, leader) {
    if (err) next(err);
    res.json(leader);
  });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Leadership.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function(err, leader) {
    if (err) next(err);
    res.json(leader);
  });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Leadership.findByIdAndRemove(req.params.id, function(err, resp) {        
    if (err) next(err);
    res.json(resp);
  });
});

module.exports = leaderRouter;