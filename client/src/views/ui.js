var CountryList = require("../models/countryList")

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

