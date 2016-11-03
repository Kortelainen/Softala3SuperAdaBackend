'use strict';

var knex = require('../db').knexlocal;
var logErrors = require('../db').logErrors;

exports.findAdmin = function(name, password, callback){
  knex.select('*').from("Admin").where({"adminName": name, "password": password})
  .then(function(results){
    var success = false;
    if(results != null && results[0] != null){
      success = results[0].adminId > 0;
    }
    callback(success);
  })
};
