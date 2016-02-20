OpenedCaptions
=============
> A distributed API for live TV closed captions.

This package can be easily incorproated into any node project in order to write code that knows what is happening on live television.

Please be warned that the project is early in its development, which means the API and code base are generally unstable for the short term.

Initially, this package is intended to power front-end applications, but eventually it will support server side events as well

New in 1.0
=============
Opened Captions used to be a standalone node app; you could download it and run it, which was fine for a quick hack but didn't make it particularly easy to use in your own code base.  Now Opened Captions is an NPM package.  See below for the new installation instructions.  You can also use the [example server](https://github.com/slifty/opened-captions-example) to get started.

The architecture has been redone to make it easy to create new stream types.
Payloads also include information about the stream itself, thus supporting multiple channels from a single server.

Installing Opened Captions
=============

```shell
npm install opened-captions
```


Creating an Opened Captions Stream
=============

Creating an opened captions server is easy:

```

# Create the Server
var OpenedCaptions = require('opened-captions');
var oc = new OpenedCaptions();

# Add a Stream
oc.addStream('random');

# Add a Better Stream
oc.addStream('server', {
  host: 'https://openedcaptions.com',
  port: 443,
  description: "CSPAN"
});

```

You also can use [this example server](https://github.com/slifty/opened-captions-example) to get started.


Tools
=============
Tests are written in Mocha.


Licensing
=============
The MIT License (MIT)
-------------
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
