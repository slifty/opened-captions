'use strict'

var express = require('express'),
  http = require('http'),
  socketio = require('socket.io'),
  Message = require('./message'),
  Promise = require('bluebird'),
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

    if(this.options.io == null) {

      // Create a new instance of socket.io
      this.io = socketio(this.options.port);
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
  OpenedCaptions.prototype.getStreams = function() {
    return this.streams;
  }

  /**
   * Handles content from streams.
   *
   * @param {String} content The content being broadcast by a stream.
   * @param {Stream} stream The stream that is broadcasting the content.
   * @return {Boolean}
   */
  OpenedCaptions.prototype.processContent = function(content, stream) {

    // Send a content message
    var contentMessage = new Message('content', content, stream);
    this.sendMessage(contentMessage);
    console.log(content);
  }

  /**
   * Handles content from streams.
   *
   * @param {String} content The content being broadcast by a stream.
   * @param {Stream} stream The stream that is broadcasting the content.
   * @return {Boolean}
   */
  OpenedCaptions.prototype.processWord = function(content, stream) {

    // Send a content message
    var contentMessage = new Message('word', content, stream);
    this.sendMessage(contentMessage);

  }

  /**
   * Sends a content message over the network.
   *
   * @param {Message} message The message being sent
   * @return {Boolean}
   */
  OpenedCaptions.prototype.sendMessage = function(message) {
    this.io.sockets.emit(message.type, message.getPayload());
  }

  /**
   * Closes an OpenedCaptions service
   *
   * @return {Boolean}
   */
  OpenedCaptions.prototype.close = function() {
    this.io.close();
  }

  

  return OpenedCaptions;
})();
