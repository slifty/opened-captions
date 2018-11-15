'use strict';

var AbstractStream = require('../abstract'),
  Utils = require('../../utils'),
  net = require('net');

var NetworkStream = function(oc, options) {
  var self = this;

  // Call the superclass constructor
  AbstractStream.call(this, oc);
  self.metadata.type = "network";

  options = options || {};

  // Default options
  self.options = Object.assign({
    host: 'localhost',
    port: 9000
  }, options);


  net = require('net');
  var s = net.createServer(function (sock) {
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function (data) {
      self.processContent(data.toString('ascii')); 
    });
  });

  s.listen(self.options.port, self.options.host, function () {});

};

// Inherit from the Abstract Stream
NetworkStream.prototype = Object.create(AbstractStream.prototype);
NetworkStream.prototype.constructor = NetworkStream;

module.exports = NetworkStream;
