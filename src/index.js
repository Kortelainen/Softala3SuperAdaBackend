'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
const server = new Hapi.Server();
var knex = require('./db').knexlocal;
const config = require('./config');
server.connection({ port: 3000 });



// Register authentication
server.register(require('hapi-auth-jwt2'), (err) => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.secret,
    validateFunc: (decoded, request, callback) => {
          callback(null, true);
    },
    verifyOptions: { algorithms: ['HS256'] }
  });
  server.route(routes);
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
