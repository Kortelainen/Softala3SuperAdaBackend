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

    .then(function() {
        //Indexes triggers etc here
    });
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('Question')
  .dropTableIfExists('Feedback');
};
