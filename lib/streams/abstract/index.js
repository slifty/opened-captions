'use strict';

var uuid = require('uuid'),
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

  this.addCursor('base',0);
  this.addCursor('word',0);

  // Register the Opened Captions instance
  this.oc = oc;

};


/**
 * The stream collected content and needs to distribute it through Opened Captions
 */
AbstractStream.prototype.processContent = function(content) {
  // Append to the buffer
  this.buffer.push(content);

  // Send the base content message
  this.oc.processContent(content, this);

  // Update the base cursor
  this.incrementCursor('base', content.length);

  // Send any words that are in the buffer
  var wordBuffer = this.getBuffer('word');
  var splitWordBuffer = wordBuffer.split(/\s/);
 
  // Drop the last item since it may be a partial word
  splitWordBuffer.pop();

  // Send word messages
  for(var x in splitWordBuffer) {
    var word = splitWordBuffer[x];

    if(word != "")
      this.oc.processWord(word,this);
  }

  // Update the word cursor position
  this.incrementCursor('word', splitWordBuffer.join('').length + splitWordBuffer.length);

  // Trim the buffer
  this.trimBuffer();

};


/**
 * If the cursor has not been added, add it.
 */
 AbstractStream.prototype.addCursor = function(cursor) {
  if(!(cursor in this.cursors))
    this.cursors[cursor] = 0;
};

/**
 * If the cursor has been set, add to it.  Otherwise set it.
 */
 AbstractStream.prototype.incrementCursor = function(cursor, value) {
  if(!(cursor in this.cursors))
    this.cursors[cursor] = 0;

  this.cursors[cursor] += value;
};

/**
 * Get the value of a cursor
 */
AbstractStream.prototype.getCursor = function(cursor) {
  if(!(cursor in this.cursors))
    return null;
  return this.cursors[cursor];
};

/**
 * Get the buffer, if a cursor is defined get the buffer from that cursor on
 */
AbstractStream.prototype.getBuffer = function(cursor) {
  if(!cursor || !(cursor in this.cursors))
    return this.buffer.join('');
  return this.buffer.join('').substring(this.getCursor(cursor));
};

/**
 * Remove old portions of the buffer (portions that no cursors are behind)
 */
AbstractStream.prototype.trimBuffer = function() {

  // Get the lowest cursor value
  var cursorValues = _.values(this.cursors);
  var index = Math.min.apply(null, cursorValues);

  // Slice off a portion (or all of) the content in the buffer
  var bufferString = this.buffer.join('');
  this.buffer = [bufferString.slice(index)];

  // Reset the positions of the cursors
  for(var x in this.cursors) {
    this.cursors[x] = Math.max(this.cursors[x] - index, 0);
  }
};

module.exports = AbstractStream;
