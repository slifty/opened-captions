'use strict';

var OpenedCaptions = require('../../index'),
  ioClient = require('socket.io-client'),
  Message = require('../../lib/message.js'),
  assert = require('should');

describe('The opened captions constructor', function() {

  it('should create a socketio listener when none has been provided', function(done) {
    var oc = new OpenedCaptions();

    // Check to make sure an io attribute was set
    oc.should.be.an.Object;
    oc.should.have.property(['io']);
    oc['io'].should.be.an.Object;
    oc.close();
    done();
  });

  it('should create a socketio listener on a specific port when port is passed', function(done) {
    var port = 8000;
    var oc = new OpenedCaptions({
      port: port
    });

    var client = ioClient.connect('http://localhost:' + port);

    client.on('connect', function() {
      oc.close();
      done();
    });
    client.on('connect_error', function(e) {
      oc.close();
      done(e)
    });
  });

});
