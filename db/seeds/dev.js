/*eslint-disable func-names*/
'use strict';

exports.seed = (knex) => (
  knex('Team').insert({
    teamName: "TeamAwesome",
    description: "we are awesome",
    active: 1,
    docId: null
  })

  .then((team) => (
    knex('Team').insert({
      teamName: "Nörtittäret",
      description: "kolme innokasta pelaajaa kalliosta",
      active: 1,
      docId: null
    })
  ))

  .then(() => (
    knex('Team').insert({
      teamName: "Voittajat",
      description: "korsosta me tullaa ja kovia me ollaan! Loppuun asti tsempataan ja kaikki meitä kannustaa!",
      active: 1,
      docId: null
    })
  ))
  .then(() => (
    knex('Team').insert({
      teamName: "ABBA",
      description: "awesome bravehearted beauties from Alppila",
      active: 1,
      docId: null
    })
  ))

  .then(() => (
    knex('Company').insert({
      companyName: "Rovio",
      password: "AngryB1rd5",
      docId: null
    })
  ))

  .then(() => (
    knex('Company').insert({
      companyName: "Super Ada",
      password: "AdaSupperDupper",
      docId: null
    })
  ))

  .then(() => (
    knex('Company').insert({
      companyName: "Futurice",
      password: "R4inbowUn1Corn",
      docId: null
    })
  ))

  .then(() => (
    knex('Company').insert({
      companyName: "XBOX",
      password: "T1t4nFall",
      docId: null
    })
  ))

  .then(() => (
    knex('CompanyPoint').insert({
      point: 3,
      teamId: 1,
      companyId: 1
    })
  ))

  .then(() => (
    knex('CompanyPoint').insert({
      point: 5,
      teamId: 2,
      companyId: 2
    })
  ))

  .then(() => (
    knex('CompanyPoint').insert({
      point: 1,
      teamId: 3,
      companyId: 4
    })
  ))

  .then(() => (
    knex('CompanyPoint').insert({
      point: 4,
      teamId: 4,
      companyId: 3
    })
  ))

  .then(() => (
    knex('Question').insert({
      questionText: "Mistä sait tiedon tapahtumasta?"
    })
  ))

  .then(() => (
    knex('Feedback').insert({
      answerText: "Haaga-Heliasta kaverilta",
      answerSelected: 1
    })
  ))

  .then(() => (
    knex('Feedback').insert({
      answerText: "Netistä",
      answerSelected: 0
    })
  ))

  .then(() => (
    knex('Admin').insert({
      adminName: "Admin",
      password: "Adm1n4dmin"
    })
  ))
);
