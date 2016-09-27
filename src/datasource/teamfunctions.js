'use strict';

var knex = require('knex')({
  client: 'pg',
  connection: {
     host : '127.0.0.1',
     user : 'petrikortelainen', /* whoami */
     password : ' ',
     database : 'postgres'
   }
});


exports.newTeam = function(name, callback){
    knex("Team").insert({teamName: name})
    .then(function(results) {
      console.log(results);
      })
    .catch(function(err) {
      console.log('Something went wrong!', err);
    });
  };

  exports.addQuestion = function(question, callback) {
   knex('Questions').insert({question})
   .then(function(results) {
     callback(null, results);
   })
   .catch(function(err) {
     callback(err);
   });
  };
