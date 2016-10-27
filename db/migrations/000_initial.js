/*eslint-disable func-names*/
'use strict';

exports.up = function(knex) {
  return knex.schema

    .createTable('Question', function(table) {
      table.increments('questionId').primary();
      table.text('questionText');
    })

    .createTable('Feedback', function(table) {
      table.increments('feedbackId').primary();
      table.text('answerText').notNullable();
      table.integer('answerSelected').notNullable();
      table.integer('questionId').references('questionId').inTable('Question');
    })

    .createTable('Document', function(table){
      table.increments('docId').primary();
      table.binary('file').notNullable();
      table.integer('doctype').notNullable();
    })

    .createTable('Team', function(table) {
      table.increments('teamId').primary();
      table.text('teamName').notNullable().unique();
      table.text('description').notNullable();
      table.boolean('active').defaultTo(true).notNullable();
      table.integer('docId').references('docId').inTable('Document');
    })

    .createTable('Company', function(table) {
      table.increments('companyId').primary();
      table.text('companyName').notNullable().unique();
      table.text('password').notNullable();
      table.integer('docId').references('docId').inTable('Document');
    })

    .createTable('CompanyPoint', function(table){
      table.increments('pointId').primary();
      table.integer('point').notNullable();
      table.integer('teamId').references('teamId').inTable('Team');
      table.integer('companyId').references('companyId').inTable('Company');
    })

    .createTable('Admin', function(table){
      table.increments('adminId').primary();
      table.text('adminName').notNullable();
      table.text('password').notNullable();
    })

    .then(function() {
        //Indexes triggers etc here
    });
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('Admin')
  .dropTableIfExists('Feedback')
  .dropTableIfExists('Question')
  .dropTableIfExists('CompanyPoint')
  .dropTableIfExists('Company')
  .dropTableIfExists('Team')
  .dropTableIfExists('Document');
};
