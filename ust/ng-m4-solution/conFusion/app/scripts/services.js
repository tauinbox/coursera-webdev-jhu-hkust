'use strict';

angular.module('confusionApp')
.constant("baseURL","http://localhost:3000/")
.service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
  this.getDishes = function() {
  	// return $http.get(baseURL + "dishes");
  	return $resource(baseURL + "dishes/:id", null, {'update': {method: 'PUT'}});
  };

  // getDish method is no longer needed when we are using a $resourse above
  
  // this.getDish = function(index) {
  // 	return $http.get(baseURL + "dishes/" + index);
  // };

	// implement a function named getPromotion
	// that returns a selected promotion.
	this.getPromotions = function() {
		// return promotions[index];
		return $resource(baseURL + "promotions/:id", null, {'update': {method: 'PUT'}});
	};

}])

.factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

var corpfac = {};

	// Implement two functions, one named getLeaders,
	// the other named getLeader(index)
	// Remember this is a factory not a service

	corpfac.getLeaders = function() {
		// return leadership;
		return $resource(baseURL + "leadership/:id", null, {'update': {method: 'PUT'}});
	};

	// corpfac.getLeader = function(index) {
	// 	return leadership[index];
	// };

	return corpfac;

}])

.factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL){
	var fbfact = {};

	fbfact.feedback = function() {
		return $resource(baseURL + "feedback/:id", null, {'update': {method: 'PUT'}});
	};

	return fbfact;
}])

;