'use strict';

var AbstractStream = require('../abstract'),
  Utils = require('../utils'),
  net = require('net');

var NetworkStream = function(oc, options) {
  var self = this;

  // Call the superclass constructor
  AbstractStream.call(this, oc);
  this.metadata.type = "random";

  options = options || {};

  // Default options
  this.options = Utils._.extend({
    host: 'localhost',
    port: 9000
  }, options);


  net = require('net');
  var s = net.createServer(function (sock) {
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED (' + sock.localPort + '): ' + sock.remoteAddress + ':' + sock.remotePort);

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function (data) {
      self.processContent(data.toString()); 
    });

    sock.on('error', function (error) {
      console.log('******* ERROR ' + error + ' *******');

      // close connection
      sock.end();
    });
  });

  s.listen(port, host, function () {
      console.log('Server listening on ' + host + ':' + s.address().port);
  });

  servers.push(s);
  });
};

// Inherit from the Abstract Stream
NetworkStream.prototype = Object.create(AbstractStream.prototype);
NetworkStream.prototype.constructor = TextStream;

module.exports = TextStream;
