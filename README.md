OpenedCaptions: A SocketIO API for live TV closed captions.
=============

This document explains how to set up the code.

If you have any questions at all please don't be afraid to ask.

Installing
-------------

Setting up the client and backend

1. Install Node.js (http://nodejs.org/)
1. Using a terminal, navigate to the the same directory as this README)
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

1. start the node server

    node app.js


Code Conventions
=============

Architecture
-------------
Communication between modules is done through payloads.

Communication between the client and server is done through messages.

The only time you should be calling a module's method directly is if you are routing a payload, or if you are expecting a return value (e.g. "getGameById")

If you have a method that should only be triggerable via a payload sent from the server (i.e. it is a server-to-server interaction such as tick()) you should use the constants.PAYLOAD_SOCKET_SERVER constant as the socket, and check for this condition early on.


Communication Method and Class Naming
-------------
For the sake of simplicity, function and class names concerning communication are always from the perspective of the server, even in client code.

"In" means the message is going from client->server ("into" the server).

"Out" means the message is going server->client ("out" of the server).

Constants
-------------
If the value of a constant is in CAPITOL LETTERS it cannot be freely changed.  For example, constants related to player role ("A", "S", etc.) are used as indexes in the localization object to look up text related to those roles.

Function Calls
-------------
Function calls should generally be on one line, except in the case of the server side's sendMessage, which should have each part on its own line.

jQuery
-------------
Chain when possible

	.because the code

	.is easier

	.to read

Language and Localization
-------------
Torwolf has been built from the beginning to be localized (holy crap over-engineering).  Make sure that any language that will end up on a user's screen goes through the locale structure.

To add a language:

cp locales/default.js locales/LANGUAGE.js

where LANGUAGE is the browser's language code (e.g. "en-US")

Note that the language files contain directories.  Generally if a node in the directory contains a string it should be UPPER CASE, if it is just a branch it should be camelCase.

For example...

	exports.dict = {
		branch: {
			LEAF_A: "leaf a",
			LEAF_B: "leaf b"
		},
		LEAF_C: "leaf c"
	}


Misc
-------------
In situations where order is functionally irrelevant, lists of things should be sorted alphabetically.  This means classes, constants, lists of lists (e.g. this sentence), switch statements, variable declarations, etc.

Payloads and Payload handlers
-------------
Payload handlers should avoid having too much logic except for validation and routing when actually processing the payload data.  For example this means that the target of a message should be included in the payload itself rather than being assumed to be a broadcast.

Payloads should not contain full objects, but should contain object attributes and object Ids.  This means the client and the server will store their own version of the object with common Ids.


Variable Naming
-------------
Variable names are camelCase.  This includes acronyms -- "ID" is "Id" and "URL" is "Url"
An attribute can only be called "id" if it is the id of that object.  If it refers to the id of another object it should be "[objectType]Id" e.g. "gameId" or "playerId"


Licensing
=============
The MIT License (MIT)
-------------
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.