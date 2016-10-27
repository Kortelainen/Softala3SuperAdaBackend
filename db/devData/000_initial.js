/*eslint-disable func-names*/
'use strict';

exports.dummydata = function(knex) {

knex('Team').insert({ teamName: "TeamAwesome",
                      description: "we are awesome",
                      active: 1,
                      docId: null
                      })

knex('Team').insert({ teamName: "Nörtittäret",
                      description: "kolme innokasta pelaajaa kalliosta",
                      active: 1,
                      docId: null
                      })

knex('Team').insert({ teamName: "Voittajat",
                      description: "korsosta me tullaa ja kovia me ollaan! Loppuun asti tsempataan ja kaikki meitä kannustaa!",
                      active: 1,
                      docId: null
                      })

knex('Team').insert({ teamName: "ABBA",
                      description: "awesome bravehearted beauties from Alppila",
                      active: 1,
                      docId: null
                      })

knex('Company').insert({ companyName: "Rovio",
                         password: "AngryB1rd5",
                         docId: null
                      })

knex('Company').insert({ companyName: "Super Ada",
                         password: "AdaSupperDupper",
                         docId: null
                      })

knex('Company').insert({ companyName: "Futurice",
                         password: "R4inbowUn1Corn",
                         docId: null
                      })

knex('Company').insert({ companyName: "XBOX",
                         password: "T1t4nFall",
                         docId: null
                      })

knex('CompanyPoint').insert({ point: 3,
                              teamId: 1,
                              companyId: 1
                      })

knex('CompanyPoint').insert({ point: 5,
                              teamId: 2,
                              companyId: 2
                      })

knex('CompanyPoint').insert({ point: 1,
                              teamId: 3,
                              companyId: 4
                      })

knex('CompanyPoint').insert({ point: 4,
                              teamId: 4,
                              companyId: 3
                        })

knex('Question').insert({ questionText: "Mistä sait tiedon tapahtumasta?"

                        })

knex('Feedback').insert({ answerText: "Haaga-Heliasta kaverilta",
                          answerSelected: 1
                        })

knex('Feedback').insert({ answerText: "Netistä",
                          answerSelected: 0
                        })

knex('Admin').insert({ adminName: "Admin",
                       password: "Adm1n4dmin"

                    })

return null;


};
