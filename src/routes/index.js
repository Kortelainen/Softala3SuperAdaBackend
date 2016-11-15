'use strict';
var knex = require('../db').knexlocal;
var authUtil = require('../utils/authUtil');
var teamDbFunctions = require('../datasource/teamfunctions.js');
var companyDbFunctions = require('../datasource/companyfunctions.js');
var companypointDbFunctions = require('../datasource/companypointfunctions.js');
var adminDbFunctions = require('../datasource/adminfunctions.js');
const Joi = require('joi');


var routes = [];

//#Region hello world fuctions



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

routes.push({
    method: 'POST',
    path: '/teamList',
    config: {
      validate: {
        payload: {
          searchfilter: Joi.string().allow("")
        }
      },
    },
    handler: function(request, reply){

      var companyId = 1; //TODO pull from sessionToken

      teamDbFunctions.getTeamList(request.payload.searchfilter, companyId, function(err, result) {
      reply({err: err , result: result });
      });
    }
});

//#EndRegion teamRoutes

//#Region Company

routes.push({
    method: 'POST',
    path: '/company/authenticate',
    config: {
      validate: {
        payload: {
          name: Joi.string().required()
        }
      }
    },
    handler: function (request, reply) {
      var success = false;
      var token = '';

      companyDbFunctions.getCompany(request.payload.name,function(err, result){
        //callback
        var success = false;
        var id = 0;
        if(result != null && result[0] != 'undefined'){
          success = result[0].companyId > 0;
          id = result[0].teamId;
        }

       if(success){
          token = authUtil.createToken(id, request.payload.name, 'company');
        }
       reply({success: success, token: token });
       }
     );
  }
});

routes.push({
    method: 'GET',
    path: '/companies',
    config: {
      auth: {
        strategy: 'jwt',
        scope: 'team'
      },
      pre: [
        {method: authUtil.bindTeamData, assign: "team"}
      ]
    },
    handler: function(request, reply){

    companyDbFunctions.getCompanies(request.pre.team.id, function(err, result) {

      reply({err: err , result: result });
    });

    } //End of handler
}); //End of POST: /company


//#EndRegion Company

// #Region CompanyPoint
routes.push({
    method: 'POST',
    path: '/companypoint',
    config: {
      /*auth: {
        strategy: 'jwt',
        scope: 'company'
      },*/
      validate: {
        payload: {
          teamId: Joi.number().required(),
          companyId: Joi.number().required(),
          point: Joi.number().required()
        }
      }/*,
      pre: [
        {method: authUtil.bindTeamData, assign: "company"}//todo make the binder
      ]*/
    },

    handler: function(request, reply){
        var companypoint = {
                      teamId: request.payload.teamId,
                      companyId: request.payload.companyId,
                      point: request.payload.point
                    } //TODO get companyid from token??


        companypointDbFunctions.addCompanyPoint(companypoint,function(err, result){

          //callback
          var success = false;
          var message = '';

          console.log(result);
          if(result != null){
            success = result > 0;
          }

          if(!success){
            message = "Adding points failed";
          }

          reply({success: success, message: message });
          }

        );
    } //End of handler
}); //End of POST: /companypoint
// #EndRegion CompanyPoint

//#Region feedback

//#EndRegion feedback

//#Region admin routes
routes.push({
  method: 'POST',
  path: '/admins/authenticate',
  config: {
    validate: {
      payload: {
        admin: Joi.string().required(),
        password: Joi.string().required()
      }
    }
  },
  handler: function(request, reply){
      adminDbFunctions.findAdmin(request.payload.admin, request.payload.password ,function(success){

        var token = '';

        if(success){
           token = authUtil.createToken(1, request.payload.admin, 'admin');
         }

         reply({success: success, token:token });
      })
  }
})
//#EndRegion admin routes

module.exports = routes;
