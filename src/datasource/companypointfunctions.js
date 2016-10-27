'use strict';

var knex = require('../db').knexlocal;
var logErrors = require('../db').logErrors;

exports.addCompanyPoint = function(companypoint, callback) {
   knex('CompanyPoint').insert(companypoint)
   .then(function(results) {
     callback(null, results);
   })
   .catch(function(err) {
     if(logErrors){
       console.log('Something went wrong!', err);
     }
     callback(err);
   });
};
