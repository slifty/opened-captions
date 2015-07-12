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
  self.options = Utils._.extend({
    host: 'localhost',
    port: 9000
  }, options);


  net = require('net');
  var s = net.createServer(function (sock) {
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED (' + sock.localPort + '): ' + sock.remoteAddress + ':' + sock.remotePort);
    sock.write(new Buffer([1]));
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function (data) {
      sock.write(new Buffer([1]));
      self.processContent(data.toString('ascii')); 
    });

    sock.on('error', function (error) {
      console.log('******* ERROR ' + error + ' *******');
    });
    sock.on('close', function() {console.log("DISCONNECTED");})
  });

  s.listen(self.options.port, self.options.host, function () {
      console.log('Server listening on ' + self.options.host + ':' + s.address().port);
  });

};

// Inherit from the Abstract Stream
NetworkStream.prototype = Object.create(AbstractStream.prototype);
NetworkStream.prototype.constructor = NetworkStream;

module.exports = NetworkStream;
