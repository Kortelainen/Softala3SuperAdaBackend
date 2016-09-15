'use strict';

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
  method: 'POST',
  path: '/teams/authenticate',
  handler: function(request, reply){
    console.log(request.payload.name);
    reply({teamID: 1})
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
