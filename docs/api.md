# Opened Captions API

This document provides information on how to write code that uses an Opened Captions
stream.  This might be server-side code that ingests a stream, or client-side code that
utilizes a stream to power a web experience.

In order to actually use this API you will need to [set up a stream](setup.md).

## API Documentation

### Event Types

There are several types of event, which are simply ways of clustering caption information
in chunks of different size.


- `content`: the most granular level of communication, often containing character-level
data although sometimes (depending on the source stream) containing multiple characters.  `content`
events will be broadcast the moment a new piece of content has been collected by a stream.

- `word`: whitespace triggers a word event, resulting in a broadcast of all buffered content
collected since the last word event.

- `line` (currently unsupported): line breaks trigger line events, resulting in a broadcast of all
buffered content collected since the last line event.

### Event Payload

Each broadcast event contains a payload, wrapped in a `data` attribute.  The structure of
this payload is the same for all event types, containing the following fields:


```javascript
{
	"body": "",				// The caption data itself
	"stream": {
		"id": "", 			// A UUID for this specific stream
		"description": "" 	// A written description determined by the server host
	}
}
```
