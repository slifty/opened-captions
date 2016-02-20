'use strict';

var AbstractStream = require('../abstract');

var RandomStream = function(oc, options) {
  // Call the superclass constructor
  AbstractStream.call(this, oc);
  this.metadata.type = "random";

  // This isn't actually random yet, in any way
  var self = this;
  setInterval(function() { self.processContent('penguins of d00m'); } , 1000 );

};

// Inherit from the Abstract Stream
RandomStream.prototype = Object.create(AbstractStream.prototype);
RandomStream.prototype.constructor = RandomStream;

module.exports = RandomStream;
