'use strict';

var OpenedCaptions = require('../../index'),
  assert = require('should');

describe('The opened captions constructor', function() {

  it('should create a socketio listener when none has been provided', function(done) {
    var oc = new OpenedCaptions();

    // Check to make sure an io attribute was set
    oc.should.be.an.Object;
    oc.should.have.enumerables(['io']);
    oc['io'].should.be.an.Object;
    oc['io'].close();
    done();
  });

});
