OpenedCaptions: A distributed API for live TV closed captions.
=============

This document explains how to set up the code.

If you have any questions at all please don't be afraid to ask.

Installing
-------------

Setting up the client and backend

**OPTION 1: Scripted Install**

1. Fork https://github.com/slifty/opened-captions
1. Install Node.js (http://nodejs.org/)
1. Using a terminal, navigate to the the same directory as this README
1. Run the install script
		./install.sh

**OPTION 2: Manual Install**

1. Fork https://github.com/slifty/opened-captions
1. Install Node.js (http://nodejs.org/)
1. Using a terminal, navigate to the the same directory as this README
1. Install the Express module (http://expressjs.com/guide.html)
1. Install the Jade module (https://github.com/visionmedia/jade#readme)
1. Install the socket.io module (http://socket.io/)
1. Install the node-uuid module (https://github.com/broofa/node-uuid/)
1. Install the serialport module (https://github.com/voodootikigod/node-serialport/blob/master/README.md)
1. Install the socket.io-client module (https://github.com/LearnBoost/socket.io-client)
1. Create a local config file
		cp config.default.js config.js
		
1. (Optional) Edit the config file
		vi config.js


Starting the Server
-------------

1. Using a terminal, navigate to the same directory as this README
1. Start the node server

    node app


About the code
=============

The Server
-------------

If all you are doing is creating a front end experience you don't need to worry about this section at all.  If you are interested in understanding how Opened Captions works or modifying your content stream, read on.

An Opened Captions server takes a live captions feed and syndicates it.  That feed can currently come in three ways:

1. Directly from a serial port (SERIAL).
1. Over the network from an existing Opened Captions server (SERVER).
1. Proxied to the server through a client connection (PROXY).

Regardless of the stream source, each update triggers a "content" payload.  That payload is passed through the server/communication.js message hub and ultimately routed to server/transcript.js where the message is passed into the "handleContent" method.  You can learn about what information the payload contains by viewing payloads.js 

The handleContent method takes the new input and uses it to determine what to broadcast to all connected parties.  This is where a server could process the information in various ways or combine it with other available information.  Regardless of what modifications occur **it is vital that handleContent broadcast a content payload. This is what allows other Opened Captions nodes to re-syndicate the stream from your server.**

Messages are sent from the server through the sendPayload() method in /server/transcript.js.  This method is passed a valid payload.getPayload() (see payloads.js) and the IDs of the intended recipient sockets.


The Client
-------------

All client code is located in the /public directory, which is what actually gets served on the web (plus a few "magic" files like socket.io which don't appear there).

The /public/javascripts/communication.js object gets messages pushed from the server over socket.io.  It then routes the payloads contained in those messages to the appropriate target object.  Transcript payloads are currently the only type, so they all end up being routed to /public/javascripts/transcript.js.  This object then routes the specific payload to its handler (e.g. wordOut, contentOut, lineOut).  These handlers are where you can do cool things -- they are called once for every word / content / line event.

There is demo code included in /public/javascripts/transcript.js for you to check out for now.  That should be what you need to go create some awesome stuff!



Conventions
=============

1. Chain whenever possible
1. In situations where order is functionally irrelevant, lists of things should be sorted alphabetically.  This means classes, constants, lists of lists (e.g. this sentence), switch statements, variable declarations, etc.
1. Variable names are camelCase.  This includes acronyms -- "ID" is "Id" and "URL" is "Url"
1. An attribute can only be called "id" if it is the id of that object.  If it refers to the id of another object it should be "[objectType]Id" e.g. "gameId" or "playerId"
1. For the sake of simplicity, function and class names concerning communication are always from the perspective of the server, even in client code.  "In" means the message is going from client->server ("into" the server).  "Out" means the message is going server->client ("out" of the server).


Licensing
=============
The MIT License (MIT)
-------------
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.