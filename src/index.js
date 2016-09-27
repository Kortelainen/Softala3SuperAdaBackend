'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
const server = new Hapi.Server();

var knex = require('./db').knexlocal;

//const pg = require('knex')({client: 'pg'});

server.connection({ port: 3000 });


server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

server.route(routes);
