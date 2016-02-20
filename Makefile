.PHONY: test

test:
	./node_modules/.bin/mocha --reporter list ./test/**/*.js

