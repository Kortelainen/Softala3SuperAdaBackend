'use strict';

var knex = require('../db').knexlocal;
var logErrors = require('../db').logErrors;

exports.getTeam = function(name, callback){
    knex.select("teamId").from("Team").where({"teamName": name })
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

exports.addTeam = function(team, callback){
    knex.select("teamId")
    .from("Team")
    .where({"teamName": team.teamName })
    .then(function(result) {
      var exists = false; // Team name exists?
      if(result != null && typeof result[0] !== 'undefined' && result[0].teamId != 'undefined'){
        exists = result[0].teamId > 0;
      }
      if(exists){
        callback("Duplicate name", null);
      }else{
        knex("Team").insert(team)
        .returning("teamId")
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
    })
    .catch(function(err) {
      if(logErrors){
        console.log('Something went wrong!', err);
      }
      callback(err);
    });
  };

  // getTeamList: Get list of teams. takes in searchfilter
  exports.getTeamList = function(searchfilter, callback){
    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?]/); //unacceptable chars
    if (pattern.test(searchfilter)) {
        searchfilter ="";//Empty string for safety
        if(logErrors){
            console.log("Illegal chars in search field")
        }
      }

      var lowercaseSF = searchfilter.toLowerCase()
      knex('Team').whereRaw(' LOWER( "teamName" ) LIKE ' + '\'%'+lowercaseSF+'%\'')
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
