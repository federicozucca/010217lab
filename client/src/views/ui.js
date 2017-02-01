var BucketList = require("../models/bucketList")

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

