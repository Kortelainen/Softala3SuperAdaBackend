'use strict';

var knex = require('../db').knexlocal;
var logErrors = require('../db').logErrors;

exports.addCompanyPoint = function(companypoint, callback) {
    knex.select('*')
    .from('CompanyPoint')
    .where({"teamId": companypoint.teamId,"companyId": companypoint.companyId })
    .then(function(result){
      var exists = false; // companypoint exists?
      if(result != null && typeof result[0] !== 'undefined' && result[0].pointId != 'undefined'){
        exists = result[0].pointId > 0;
      }

      if(exists){//Update old row
        knex('CompanyPoint')
        .where('pointId', '=', result[0].pointId)
        .update({
          point: companypoint.point
        })
        .then(function(insertResult) {
           callback(null, insertResult);
         })
         .catch(function(err) {
           if(logErrors){
             console.log('Something went wrong!', err);
           }
           callback(err);
         });
      }else{//insert new row
        knex('CompanyPoint')
        .insert(companypoint)
        .then(function(insertResult) {
             callback(null, insertResult);
           })
           .catch(function(err) {
             if(logErrors){
               console.log('Something went wrong!', err);
             }
             callback(err);
           });
      }
    })
};

exports.clearCompanyPoint = function(clearPoints, callback) {
    knex.select('*')
    .from('CompanyPoint')
    .where({"teamId": clearPoints.teamId,"companyId": clearPoints.companyId })
    .then(function(result) {
      var exists = false; // companypoint exists?
      if(result != null && typeof result[0] !== 'undefined' && result[0].pointId != 'undefined') {
        exists = result[0].pointId > 0;
      }
      if(exists) {
        knex('CompanyPoint')
        .del()
        .where('pointId', '=', result[0].pointId)
        .then(function(insertResult) {
           callback(null, insertResult);
         })
         .catch(function(err) {
           if(logErrors){
             console.log('Something went wrong!', err);
           }
           callback(err);
         });
      }
    })
};
