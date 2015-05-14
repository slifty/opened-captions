'use strict';

var EventEmitter = require('events').EventEmitter;

var RandomStream = function(oc, options) {
  this.oc = oc;

  // This isn't actually random yet, in any way
  setInterval(function() { oc.handleContent('random', this);} , 1000 );
};

module.exports = RandomStream;
