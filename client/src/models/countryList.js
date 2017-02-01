var Country = require('./country')

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