'use strict';

var uuid = require('node-uuid'),
  _ = require('lodash');

var AbstractStream = function(oc, options) {
  options = options || {};

  // Default options
  this.metadata = _.extend({
    id: uuid.v4(),
    description: ''
  }, options);

  this.id = this.metadata.id;


  // Set up buffers and cursors
  this.buffer = [];
  this.cursors = {};

  // Register the Opened Captions instance
  this.oc = oc;

};


/**
 * The stream collected content and needs to distribute it through Opened Captions
 */
AbstractStream.prototype.processContent = function(content) {
  this.buffer.push(content);
  this.oc.processContent(content, this);
};

AbstractStream.prototype.getBuffer = function() {
  return this.buffer.join('');
};

AbstractStream.prototype.setCursor = function(cursor, value) {
  this.cursors[cursor] = value;
};

AbstractStream.prototype.getCursor = function(cursor) {
  return this.cursors[cursor];
};

AbstractStream.prototype.trimBuffer = function(index) {

  // Slice off a portion (or all of) the content in the buffer
  var buffer = this.buffer.join('');
  index = index || buffer.length;
  this.buffer = [buffer.slice(index)];

  // Reset the positions of the cursors
  for(var x in this.cursors) {
    this.cursors[x] = Math.max(this.cursors[x] - index, 0);
  }
  
};

module.exports = AbstractStream;
