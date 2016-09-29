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
      table.increments('teamID').primary();
      table.text('teamName').notNullable().unique();
      table.text('description').notNullable();
      table.boolean('active').defaultTo(true).notNullable();
      table.integer('docId').references('docId').inTable('Document');
    })

    .then(function() {
        //Indexes triggers etc here
    });
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('Question')
  .dropTableIfExists('Feedback')
  .dropTableIfExists('Document')
  .dropTableIfExists('Team');
};
