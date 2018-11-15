# Using Opened Captions
This document provides a baseline overview of setting up an environment where
you can use an existing opened captions stream.  If you are interested in hosting
your own stream from an original source, please review the [hosting documentation](host.md).

## Socket.IO
Opened Captions is powered by the websocket library Socket.IO, so the first step to using
opened captions is glancing at [their documentation](https://github.com/socketio/socket.io-client/blob/master/docs/API.md).

The key point to understand is that websockets provide a persistant connection between a client
and a server, allowing for back and forth communication.  This is a different metaphor than
traditional web traffic, which is more of a call and response.

This is what allows an Opened Captions server to push alerts as words are spoken on TV.

## Browser-Based Clients
In order to build an application that uses opened captions data, you need a caption source.
You can review the [hosting documentation](host.md) if you have a local source.  Otherwise, use
one of the streams provided by [openedcaptions.com](https://openedcaptions.com).

To stay scalable, openedcaptions.com enforces CORS.  This means that a browser-based client
will not be able to directly connect to caption streams hosted there.  To get around this
you will need to deploy your own server and configure it to connect to openedcaptions.com.

The easiest way to do this for the purposes of experimentation is to clone and deploy the
[Opened Captions Example Server](https://github.com/slifty/opened-captions-example).  Once
deployed, you can create browser based experiences by editing `public/index.html`.

For more information about the structure of the data sent over this stream review the 
[API documentation](api.md).
