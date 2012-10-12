var config = {}

config.mongo = {};
config.web = {};

config.mongo.base = 'mongodb://host/db';
config.mongo.host = 'hostname';
config.mongo.port = 6379;
config.web.port = process.env.WEB_PORT || 3000;

module.exports = config;