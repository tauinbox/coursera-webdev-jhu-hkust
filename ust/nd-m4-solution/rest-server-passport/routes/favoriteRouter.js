var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Faforites = require('../models/favorites');

var Verify = require('./verify');

var favoriteRouter = express.Router();

favoriteRouter .use(bodyParser.json());

favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  Faforites.find({"postedBy": req.decoded._doc._id}).populate('postedBy dishes').exec(function(err, favorites) {
    if (err) throw err;
    res.json(favorites);
  });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {

  Faforites.find({"postedBy": req.decoded._doc._id}, function(err, favorite) {
    if (err) throw err;
    if (favorite.length === 0) {
      favor = new Faforites({postedBy: req.decoded._doc._id, dishes: [req.body._id]});
      console.log("Add new favorite: " + favor);
      favor.save(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
    else {
      favorite = favorite[0];
      console.log("!!!!!!!!! We have favorites:")
      console.log(favorite.dishes);
      for (var i = 0; i < favorite.dishes.length; i++) {
        if (favorite.dishes[i] == req.body._id) {
          var err = new Error('That dish is already added to favorites');
          err.status = 500;
          return next(err);          
        }
      }

      favorite.dishes.push(req.body._id);
      favorite.save(function (err, result) {
        if (err) throw err;
        console.log('!!!!!!!!! Updated Favorites:');
        console.log(favorite.dishes);
        res.json(result);
      });
    }

  });   
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
  Faforites.remove({"postedBy": req.decoded._doc._id}, function(err, resp) {
    if (err) throw err;
    res.json(resp);
  });
});

//////////////////////////////////////////////

favoriteRouter.route('/:id')
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
  Faforites.find({"postedBy": req.decoded._doc._id}, function(err, favorite) {        
    if (err) throw err;
    favorite = favorite[0];
    for (var i = 0; i < favorite.dishes.length; i++) {
      if (favorite.dishes[i] == req.params.id) {
        console.log("!!! Remove " + favorite.dishes[i] + " from favorites")
        favorite.dishes.splice(i, 1);
      }
    }    
    favorite.save(function (err, favorite) {
      if (err) throw err;
      res.json(favorite);
    });
  });
});

module.exports = favoriteRouter;