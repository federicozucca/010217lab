var MongoClient = require('mongodb').MongoClient;

var BucketListQuery = function(){ //NEW
  this.url = 'mongodb://localhost:27017/bucketList';
}

BucketListQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db) {
      if(db){
        var collection = db.collection('bucketList'); 
        collection.find().toArray(function(err, docs) {
          console.log(docs);
          onQueryFinished(docs);
        });
      }
    });
  },
  add: function(countryToAdd, onQueryFinished) {  
    MongoClient.connect(this.url, function(err, db) {
      if(db){
          var collection = db.collection('bucketList');
          collection.insert(countryToAdd);
          collection.find().toArray(function(err, docs) {
            console.log(docs);
            onQueryFinished(docs);
          });
        };
    });
  }
}

module.exports = BucketListQuery;