'use strict';

var AbstractStream = require('../abstract'),
  Utils = require('../../utils'),
  ioClient = require('socket.io-client');

var ServerStream = function(oc, options) {
  var self = this;

  // Call the superclass constructor
  AbstractStream.call(this, oc);
  self.metadata.type = "server";

  options = options || {};

  // Default options
  self.options = Object.assign({
    host: 'localhost',
    port: 80
  }, options);

  var socket = ioClient(self.options.host + ":" + self.options.port);

  socket.on('content', function(data) {
     self.processContent(data.data.body);
  })
};

// Inherit from the Abstract Stream
ServerStream.prototype = Object.create(AbstractStream.prototype);
ServerStream.prototype.constructor = ServerStream;

module.exports = ServerStream;
