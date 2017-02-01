var Country = function (options) {
  this.name = options.name;
  this.capitalCity = options.capital;
  this.population = options.population;
  this.region = options.region;
  this.subRegion = options.subregion;
}

module.exports = Country;