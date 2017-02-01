var CountryList = require('./countryList')

var BucketList = function(){
  var countriesList = new CountryList;
  var countryList = countriesList.all();
}

BucketList.prototype = {
  makeRequest: function(method, url, callback, data){
    var request = new XMLHttpRequest();

    request.open(method, url);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = callback;
    request.send(data);
  },

  all: function(callback){
    var self = this;
    this.makeRequest("GET", "http://localhost:3000/api/bucketlist", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);

      var countries = self.populateCountries(results);
      callback(countries);
      console.log("2nd log")
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
