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

	var CountryList = __webpack_require__(3)
	
	var UI = function(){
	  var countryList = new CountryList();
	  countryList.all(function(result){
	    this.render(result);
	  }.bind(this));
	  console.log(countryList)
	}
	
	UI.prototype = {
	
	  createOption: function(select, country){
	    var option = document.createElement('option');
	    option.innerText = country.name;
	    select.appendChild(option);
	  },
	
	  render: function(countryList) {
	    var container = document.getElementById('bucketList');
	    var select = document.createElement("select");
	    var button = document.createElement("button");
	    button.innerText = "Add"
	
	    for (var country of countryList) {
	      this.createOption(select, country)
	    }
	    container.appendChild(select);
	    container.appendChild(button);
	    button.onclick = function(){
	      console.log(select.value)
	      var request = new XMLHttpRequest();
	      request.open("POST", "http://localhost:3000/api/bucketlist");
	      request.setRequestHeader("Content-type", "application/json");
	      
	      request.onload = function(){
	        
	        console.log("we tried...");
	      }
	      // console.log(results)
	      request.send({name: select.value});
	    }
	  }
	}
	
	module.exports = UI;
	


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Country = __webpack_require__(4)
	
	var CountryList = function () {
	
	}
	
	CountryList.prototype = {
	  makeRequest: function(method, url, callback, data){
	    var request = new XMLHttpRequest();
	
	    request.open(method, url);
	    // request.setRequestHeader("Content-type", "application/json");
	    request.onload = callback;
	    request.send(data);
	  },
	  
	  all: function(callback){
	    var self = this;
	    this.makeRequest("GET", "https://restcountries.eu/rest/v1/all", function(){
	      if(this.status !== 200) return;
	      var jsonString = this.responseText;
	      var results = JSON.parse(jsonString);
	      console.log(results)
	
	      var countries = self.populateCountries(results);
	      callback(countries);
	    });
	  }, 
	
	  populateCountries: function (results) {
	    var countries = [];
	
	    for (var result of results){
	      var country = new Country(result);
	      countries.push(country);
	    }
	    return countries
	  }
	
	
	}
	
	module.exports = CountryList;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var Country = function (options) {
	  this.name = options.name;
	  this.capitalCity = options.capital;
	  this.population = options.population;
	  this.region = options.region;
	  this.subRegion = options.subregion;
	}
	
	module.exports = Country;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map