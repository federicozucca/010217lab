/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var UI = __webpack_require__(1);
	
	var app = function() {
	  new UI();
	};
	
	window.onload = app;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var BucketList = __webpack_require__(2)
	
	var UI = function(){
	  var bucketList = new BucketList();
	  bucketList.all(function(result){
	    this.render(result);
	  }.bind(this));
	}
	
	UI.prototype = {
	
	  createText: function(text, label) {
	    var p = document.createElement('p');
	    p.innerText = label + text;
	    return p;
	  },
	
	  appendText: function(element, text, label) {
	    var pTag = this.createText(text, label);
	    element.appendChild(pTag);
	  },
	
	  render: function(bucketList) {
	    var container = document.getElementById('bucketList');
	
	    for (var country of bucketList) {
	      var li = document.createElement('li');
	      this.appendText(li, country.name, "Country name: ");
	      this.appendText(li, country.region, "Region name: ");
	      container.appendChild(li);
	    }
	  }
	}
	
	module.exports = UI;
	


/***/ },
/* 2 */
/***/ function(module, exports) {

	var BucketList = function(){
	
	}
	
	BucketList.prototype = {
	  makeRequest: function(method, url, callback, payload){
	    var request = new XMLHttpRequest();
	
	    request.open(method, url);
	    request.setRequestHeader("Content-type", "application/json");
	    request.onload = callback;
	    request.send(payload);
	  },
	
	  all: function(callback){
	    var self = this;
	    this.makeRequest("GET", "http://localhost:3000/api/bucketlist", function(){
	      if(this.status !== 200) return;
	      var jsonString = this.responseText;
	      var results = JSON.parse(jsonString);
	
	      var countries = self.populateCountries(results);
	      callback(countries);
	    });
	  },
	
	  populateCountries: function (results) {
	    var countries = [];
	
	    for (var country of results){
	      var country = new Country(result);
	      countries.push(country);
	    }
	    return countries
	  }
	
	}
	
	module.exports = BucketList;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map