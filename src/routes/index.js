'use strict';
var knex = require('../db').knexlocal;
var authUtil = require('../utils/authUtil');
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

    var success = true

    for (var i = 0; i < 5; i++) {
      knex("Question").insert({questionText: i})
      .then(function(results) {
        console.log(results);
        if(success == true){
          success = results.rowCount > 0
        }
        })

      .catch(function(err) {
        console.log('Something went wrong!', err);
      });
    }
    reply({success: success});

  }
});

//#Region teamRoutes
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
     teamDbFunctions.getTeam(request.payload.name,function(err, result){
       //callback
       var success = result != null;
       var token = '';
       if(success){
          //token = authUtil.createToken(result, request.payload.name, 'team');
        }
       reply({success: success, token: token, result: result});
       }
     );
  }
});

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

        teamDbFunctions.addTeam(team,function(err, result){
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
