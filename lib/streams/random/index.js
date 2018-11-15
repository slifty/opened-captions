'use strict';

var AbstractStream = require('../abstract');

var RandomStream = function(oc, options) {
  // Call the superclass constructor
  AbstractStream.call(this, oc);
  this.metadata.type = "random";

  // This isn't actually random yet, in any way
  var self = this;
  this.streamInterval = setInterval(function() {
    self.processContent('penguins of d00m');
  }, 1000 );

};

// Inherit from the Abstract Stream
RandomStream.prototype = Object.create(AbstractStream.prototype);
RandomStream.prototype.constructor = RandomStream;

// Override the close method, clean up after yourself
RandomStream.prototype.close = function() {
  clearInterval(this.streamInterval)
}

module.exports = RandomStream;
