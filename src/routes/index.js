'use strict';
var knex = require('../db').knexlocal;
var authUtil = require('../utils/authUtil');
var teamDbFunctions = require('../datasource/teamfunctions.js');
const Joi = require('joi');


var routes = [];

//#Region hello world fuctions

routes.push({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply({helloworld: 'Hello world!'});
    }
});

//# End of helloworld routes

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
       var success = false;
       var id = 0;
       if(result != null && result[0] != 'undefined'){
         success = result[0].teamId > 0;
         id = result[0].teamId;
       }

       var token = '';
       if(success){
          token = authUtil.createToken(id, request.payload.name, 'team');
        }
       reply({success: success, token: token });
       }
     );
  }
});

routes.push({
    method: 'POST',
    path: '/teams',
    config: {
      auth: {
        strategy: 'jwt',
        scope: 'team' //TODO change this to admin later
      },
      validate: {
        payload: {
          name: Joi.string().required(),
          description: Joi.string(),
          documentId: Joi.number()
        }
      },
      pre: [
        {method: authUtil.bindTeamData, assign: "team"}
      ]
    },

    handler: function(request, reply){
        var team = {  teamName: request.payload.name,
                      description: request.payload.description,
                      active: 1,
                      docId: request.payload.documentId
                    }

        teamDbFunctions.addTeam(team,function(err, result){
          //callback
          var success = false;
          var message = '';
          if(result != null && result[0] != null){
            success = result[0] > 0;
          }
          if(!success){
            message = "Adding team failed. Possibly due to dublicate name";
          }

          reply({success: success, message: message });
          }
        );
    } //End of handler
}); //End of POST: /teams

//#EndRegion teamRoutes

//#Region Company
routes.push({
    method: 'GET',
    path: '/companies',
    handler: function (request, reply) {
        reply({helloworld: 'companies'});
    }
});
routes.push({
    method: 'POST',
    path: '/company/authenticate',
    handler: function (request, reply) {
        reply({helloworld: 'authenticate'});
    }
});
//#EndRegion Company


//#Region feedback

//#EndRegion feedback


module.exports = routes;
