'use strict';

exports.logErrors = true; // true = write errors

exports.knexlocal = require('knex')({
  client: 'pg',
  connection: {
     host : '127.0.0.1',
     user : 'petrikortelainen', /* whoami */
     password : '',
     database : 'postgres'
   }
});
