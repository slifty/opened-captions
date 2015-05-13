'use strict'

var express = require('express'),
  http = require('http'),
  socketio = require('socket.io'),
  Utils = require('./utils');

/**
 * This is the main class, the entry point to opened captions. To use it, you just need to import opened captions:
 *
 * ```js
 * var oc = require('opened-captions');
 * ```
 *
 * @class OpenedCaptions
 */
module.exports = (function() {

  /**
   * Opened captions constructor
   */

  var OpenedCaptions = function(options) {
    options = options || {};

    // Default options
    this.options = Utils._.extend({
      io: null,
      port: 8080
    }, options);
    
    // Did the user pass an existing socketio instance?
    if(this.options.io == null) {
      // Create a new instance of express / socket.io
      var app = express();
      var server = http.createServer(app);
      this.options.io = socketio(server);

      server.listen(this.options.port, function () {
        console.log('Server listening at port %d', this.options.port);
      });

      return server;
    }
  }

  return OpenedCaptions;
})();
