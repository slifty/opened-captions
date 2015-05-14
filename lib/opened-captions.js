'use strict'

var express = require('express'),
  http = require('http'),
  socketio = require('socket.io'),
  Utils = require('./utils');

/**
 * This is the main class, the entry point to opened captions. To use it, you just need to import opened captions:
 *
 * ```js
 * var OpenedCaptions = require('opened-captions');
 * ```
 *
 * @class OpenedCaptions
 */
module.exports = (function() {

  /**
   * Opened captions constructor
   * var oc = new OpenedCaptions()
   */
  var OpenedCaptions = function(options) {
    options = options || {};

    // Default options
    this.options = Utils._.extend({
      io: null,
      port: 8080
    }, options);

    this.streams = [];
    
    // Did the user pass an existing socketio instance?
    if(this.options.io == null) {
      // Create a new instance of express / socket.io
      var app = express();
      var server = http.createServer(app);
      this.io = socketio(server);

      server.listen(this.options.port, function () {});
    }
  }

  /**
   * Adds a content stream to the OpenedCaptions service.
   *
   * @param {String} type The type of stream, as determined by the installed opened-caption stream types.
   * @return {Stream}
   */
  OpenedCaptions.prototype.addStream = function(type, options) {
    try {
      var Stream = require('./streams/' + type);
      var stream = new Stream(this, options);
      this.streams.push(stream);
      return stream;
    } catch (err) {
      throw new Error('The stream type ' + type + ' is not supported. ('+err+')');
    }
  }

  /**
   * Returns a list of the currently registered streams.
   *
   * @return {[Stream]}
   */
  OpenedCaptions.prototype.getStreams = function(type, options) {
    return this.streams;
  }

  /**
   * Handles content from streams.
   *
   * @param {String} content The content being broadcast by a stream.
   * @param {Stream} stream The stream that is broadcasting the content.
   * @return {Boolean}
   */
  OpenedCaptions.prototype.handleContent = function(content, stream) {
  }

  return OpenedCaptions;
})();
