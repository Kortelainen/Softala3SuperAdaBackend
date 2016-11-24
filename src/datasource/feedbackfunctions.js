'use strict';

var knex = require('../db').knexlocal;
var logErrors = require('../db').logErrors;

exports.saveFeedback = function(feedback, callback) {
        var sql = knex("Feedback").insert(feedback)
        .returning("feedbackId")
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
