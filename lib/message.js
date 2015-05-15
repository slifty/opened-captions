'use strict'

var OpenedCaptionsMessage = function(type, content, stream) {
  this.type = type;
  this.body = content;
  this.stream = stream;
};

OpenedCaptionsMessage.prototype.setStream = function(stream) {
  this.stream = stream;
}

OpenedCaptionsMessage.prototype.getPayload = function() {
  return {
    type: this.type,
    data: {
      body: this.body,
      stream: this.stream.metadata
    }
  }
};


module.exports = OpenedCaptionsMessage
