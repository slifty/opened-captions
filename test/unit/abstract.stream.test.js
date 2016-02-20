'use strict';

var OpenedCaptions = require('../../index'),
  assert = require('should');

describe('The abstract stream', function() {

  it('can be added to an opened captions instance', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    Object.keys(oc.getStreams()).length.should.equal(1);
    oc.close();
    done();
  });

  it('does not have an unspecified cursor', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    assert.not.exists(stream.getCursor("custom"));
    done();
  });

  it('has a word cursor by default', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    assert.exists(stream.getCursor("word"));
    stream.getCursor("word").should.equal(0);
    done();
  });

  it('has a base cursor by default', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    assert.exists(stream.getCursor("base"));
    stream.getCursor("base").should.equal(0);
    done();
  });

  it('has a custom cursor when added', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    stream.addCursor("custom");
    assert.exists(stream.getCursor("custom"));
    stream.getCursor("custom").should.equal(0);
    done();
  });

  it('will increment a cursor by a set value', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    stream.getCursor("base").should.equal(0);
    stream.incrementCursor("base",10);
    stream.getCursor("base").should.equal(10);
    done();
  });

  it('increments base cursor without whitespace', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    stream.getCursor("base").should.equal(0);
    stream.processContent("word");
    stream.getCursor("base").should.equal(4);
    done();
  });

  it('does not increment word cursor without whitespace', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    stream.getCursor("word").should.equal(0);
    stream.processContent("word");
    stream.getCursor("word").should.equal(0);
    done();
  });

  it('increments base counter with simple whitespace', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    
    // Add a custom cursor to prevent trimming
    stream.addCursor("custom");

    stream.processContent("two words");
    stream.getCursor("base").should.equal(9);
    stream.processContent(" and two more");
    stream.getCursor("base").should.equal(22);
    done();
  });

  it('increments word counter with simple whitespace', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    
    // Add a custom cursor to prevent trimming
    stream.addCursor("custom");

    stream.processContent("two words");
    stream.getCursor("word").should.equal(4);
    stream.processContent(" and two more");
    stream.getCursor("word").should.equal(18);
    done();
  });

  it('increments word counter with complex whitespace', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    
    // Add a custom cursor to prevent trimming
    stream.addCursor("custom");

    stream.processContent("two\nwords");
    stream.getCursor("word").should.equal(4);
    stream.processContent("  and\n\n\ttwo more");
    stream.getCursor("word").should.equal(21);
    done();
  });

  it('trims the buffer when words occur', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    
    stream.processContent("two\nwords");
    stream.getBuffer().should.equal("words");
    done();
  });

  it('updates the cursors when the buffer is trimmed', function(done) {
    var oc = new OpenedCaptions();
    oc.addStream('abstract');
    var stream = oc.getStreams().pop();
    
    stream.processContent("two\nwords");
    stream.getCursor("word").should.equal(0);
    stream.getCursor("base").should.equal(5);
    done();
  });

});
