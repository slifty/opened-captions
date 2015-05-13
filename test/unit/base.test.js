'use strict';

var oc = require('../../index'),
  assert = require('should');

describe('The opened captions constructor', function() {

  it('create a socketio listener when given no parameters', function(done) {
    var server = new oc();

    // Check to make sure a few selected keys exist which are known to be part of Socket.io objects
    server.should.be.an.Object;
    server.should.have.enumerables(['_connectionKey', '_connections', 'timeout', 'domain']);
    done();
  });

});
