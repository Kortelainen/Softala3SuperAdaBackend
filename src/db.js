'use strict';

exports.knexlocal = require('knex')({
  client: 'pg',
  connection: {
     host : '127.0.0.1',
     user : 'petrikortelainen', /* whoami */
     password : ' ',
     database : 'postgres'
   }
});
