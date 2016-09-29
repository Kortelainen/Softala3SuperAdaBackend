'use strict';

var knex = require('../db').knexlocal;

var teamDbFunctions = require('../datasource/teamfunctions.js');
const Joi = require('joi');

var routes = [];

//#Region: hello world fuctions

routes.push({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply({helloworld: 'Hello world!'});
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
  config: {
    validate: {
      payload: {
        name: Joi.string().required()
      }
    }
  },
  handler: function(request, reply){
    reply({teamID: 1, teamname: request.payload.name})
  }
});

//#Region teamRoutes
routes.push({
    method: 'POST',
    path: '/teams',
    config: {
      validate: {
        payload: {
          name: Joi.string().required(),
          description: Joi.string(),
          documentId: Joi.number()
        }
      }
    },
    handler: function(request, reply){
        var team = {  teamName: request.payload.name,
                      description: request.payload.description,
                      active: 1,
                      docId: request.payload.documentId
                    }

        teamDbFunctions.addTeam(team,function(result){
          //callback
          reply(result);
          }
        );
    } //End of handler
}); //End of POST: /teams

//#EndRegion teamRoutes

//#Region feedback

//#EndRegion feedback


module.exports = routes;
