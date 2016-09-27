'use strict';

var knex = require('knex')({
  client: 'pg',
  connection: {
     host : '127.0.0.1',
     user : 'petrikortelainen', /* whoami */
     password : ' ',
     database : 'postgres'
   }
});

var teamDbFunctions = require('../datasource/teamfunctions');
const Joi = require('joi');

var routes = [];

routes.push({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

routes.push({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

routes.push({
  method: 'GET',
  path: '/knexTest',
  handler: function (request, reply){

    for (var i = 0; i < 5; i++) {
      knex("Question").insert({questionText: i})
      .then(function(results) {
        console.log(results);
        reply({success: (results.rowCount > 0)});
        })

      .catch(function(err) {
        console.log('Something went wrong!', err);
      });
    }


  }
});

routes.push({
  method: 'POST',
  path: '/teams/authenticate',
  handler: function(request, reply){
    reply({teamID: 1, teamname: request.payload.name})
  },
  config: {
    validate: {
      payload: {
        name: Joi.string().required()
      }
    }
  }
})

module.exports = routes;
