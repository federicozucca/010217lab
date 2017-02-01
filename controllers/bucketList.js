var express = require('express');
var app = express();
var bucketListRouter = express.Router();
var bucketListQuery = require('../client/db/bucketListQuery');
var query = new bucketListQuery();

var bucketList = require('../client/src/models/bucketList');
var countryList = require('../client/src/models/countryList');
var country = require('../client/src/models/country');

//country index
bucketListRouter.get('/', function(req, res) {
  query.all(function(results){ //NEW
    res.json(results);
  });
});


//country by id
bucketListRouter.get('/:id', function(req, res){
  res.json(bucketList[req.params.id]);
});


//add new country
bucketListRouter.post('/', function(req, res) {
  console.log(req.body)
  var country = new country({
    name: req.body.name
  });
  query.add(country,function(results){ 
      res.json(results);
    });
});

//delete country
bucketListRouter.delete('/:id', function(req, res) {
  bucketList.splice(req.params.id, 1);
  res.json({data: bucketList});
});



module.exports = bucketListRouter;
