'use strict';

var knex = require('../db').knexlocal;
var logErrors = require('../db').logErrors;

exports.getCompany = function(name, callback){
    knex.select("companyId").from("Company").where({"companyName": name })
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


exports.getCompanies = function(callback){
  knex.select("companyName", "docId").from("Company")
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

exports.addCompany = function(company, callback){
        knex("Company").insert(company)
        .returning("companyId")
        .then(function(re) {
          callback(null, re);
          })
        .catch(function(err) {
          if(logErrors){
            console.log('Something went wrong!', err);
          }
          callback(err);
        });
  };

  exports.addQuestion = function(question, callback) {
   knex('Questions').insert({question})
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
