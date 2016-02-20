'use strict';

var AbstractStream = require('../abstract'),
  Utils = require('../../utils'),
  ioClient = require('socket.io-client');

var ServerStream = function(oc, options) {
  var self = this;

  // Call the superclass constructor
  AbstractStream.call(this, oc);
  self.metadata.type = "network";

  options = options || {};

  // Default options
  self.options = Utils._.extend({
    host: 'localhost',
    port: 80
  }, options);

  ioClient.connect(self.options.host + ":" + self.options.port);

  console.log(ioClient);

  ioClient.on('content', function(data) {
    // self.processContent(data.data.body);
  })
};

// Inherit from the Abstract Stream
ServerStream.prototype = Object.create(AbstractStream.prototype);
ServerStream.prototype.constructor = ServerStream;

module.exports = ServerStream;
