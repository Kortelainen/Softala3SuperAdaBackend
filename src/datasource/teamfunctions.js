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

exports.getDetails = function(teamId, callback){
  /*
    SELECT "Team"."description", "Document"."file"
    FROM "Team"
    LEFT JOIN "Document" on "Document"."docId" = "Team"."docId"
    WHERE "Team"."teamId" = 27;
  */
    knex.select('Team.name', 'Team.description', 'Document.file')
    .from("Team")
    .leftJoin('Document', 'Document.docId', 'Team.docId')
    .where({"teamId": teamId })
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
  exports.getTeamList = function(searchfilter, companyId, callback){
    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?]/); //unacceptable chars
    if (pattern.test(searchfilter)) {
        searchfilter ="";//Empty string for safety
        if(logErrors){
            console.log("Illegal chars in search field")
        }
      }

      var lowercaseSF = searchfilter.toLowerCase()
      knex.select('Team.*', 'CompanyPoint.point', 'Document.file')
      .from("Team")
      .joinRaw('LEFT JOIN "CompanyPoint" on "Team"."teamId" = "CompanyPoint"."teamId" AND "CompanyPoint"."companyId" = '+ companyId+ ' ')
      .leftJoin('Document', 'Document.docId', 'Team.docId')
      .whereRaw(' LOWER( "teamName" ) LIKE ' + '\'%'+lowercaseSF+'%\'')
      .orderBy('Team.teamName', 'asc')
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

  exports.updateTeamDetails = function(docId, teamId, callback){
    //UPDATE "Team" SET "description" = 'derp', "docId" = 1   where "teamId" = 28;

    knex("Team")
    .where('teamId', '=', teamId)
    .update({
      docId: docId//,
      //description: undefined
    })
    .then(function(results) {
      callback(null, results);
      })
    .catch(function(err) {
      if(logErrors){
        console.log('Something went wrong!', err);
      }
      callback(err);
    });
  }
