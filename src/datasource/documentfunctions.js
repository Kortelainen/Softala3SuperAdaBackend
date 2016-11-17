'use strict';

var knex = require('../db').knexlocal;
var logErrors = require('../db').logErrors;

exports.saveDocument = function(document, callback){
  knex("Document").insert(document)
  .returning("docId")
  .then(function(re) {
    callback(null, re);
    })
  .catch(function(err) {
    if(logErrors){
      console.log('Something went wrong!', err);
    }
    callback(err);
  });
}
