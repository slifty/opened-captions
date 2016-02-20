'use strict';

var OpenedCaptions = require('../../index'),
  assert = require('should');

describe('The random stream', function() {

  it('can be added to an opened captions instance', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('random');
    Object.keys(oc.getStreams()).length.should.equal(1);
    oc.close();
    done();
  });

});
