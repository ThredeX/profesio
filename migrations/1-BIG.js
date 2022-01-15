'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Building", deps: []
 * createTable "Faculty", deps: []
 * createTable "School", deps: []
 * createTable "Specialization", deps: []
 * createTable "User", deps: []
 * createTable "Administrator", deps: [User]
 * createTable "Room", deps: [Building]
 * createTable "Student", deps: [Specialization, User]
 * createTable "Teacher", deps: [User]
 * createTable "Subject", deps: [Teacher]
 * createTable "Lecture", deps: [Faculty, Subject, Teacher, Room]
 * createTable "Participations", deps: [Lecture, Student]
 * createTable "BuildingInfo", deps: [Building, Faculty]
 *
 **/

var info = {
    "revision": 1,
    "name": "BIG",
    "created": "2022-01-15T16:24:54.617Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "Building",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "address": {
                        "type": Sequelize.STRING,
                        "field": "address"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Faculty",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "shortcut": {
                        "type": Sequelize.STRING,
                        "field": "shortcut",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "School",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "adress": {
                        "type": Sequelize.STRING,
                        "field": "adress"
                    },
                    "website": {
                        "type": Sequelize.STRING,
                        "field": "website"
                    },
                    "timetable_start": {
                        "type": Sequelize.DATE,
                        "field": "timetable_start",
                        "allowNull": false
                    },
                    "timetable_end": {
                        "type": Sequelize.DATE,
                        "field": "timetable_end",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Specialization",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "type": {
                        "type": Sequelize.STRING,
                        "field": "type",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "User",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "username": {
                        "type": Sequelize.STRING,
                        "field": "username",
                        "allowNull": false,
                        "unique": true
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": false
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "surname": {
                        "type": Sequelize.STRING,
                        "field": "surname",
                        "allowNull": false
                    },
                    "telephone_number": {
                        "type": Sequelize.INTEGER,
                        "field": "telephone_number"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Administrator",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "can_edit": {
                        "type": Sequelize.BOOLEAN,
                        "field": "can_edit",
                        "allowNull": false
                    },
                    "UserId": {
                        "type": Sequelize.INTEGER,
                        "field": "UserId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "User",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt",
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Room",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "label": {
                        "type": Sequelize.INTEGER,
                        "field": "label",
                        "allowNull": false
                    },
                    "BuildingId": {
                        "type": Sequelize.INTEGER,
                        "field": "BuildingId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Building",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Student",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "entry_year": {
                        "type": Sequelize.INTEGER,
                        "field": "entry_year",
                        "allowNull": false
                    },
                    "SpecializationId": {
                        "type": Sequelize.INTEGER,
                        "field": "SpecializationId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Specialization",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "UserId": {
                        "type": Sequelize.INTEGER,
                        "field": "UserId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "User",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Teacher",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "UserId": {
                        "type": Sequelize.INTEGER,
                        "field": "UserId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "User",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Subject",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "short": {
                        "type": Sequelize.STRING,
                        "field": "short",
                        "allowNull": false
                    },
                    "TeacherId": {
                        "type": Sequelize.INTEGER,
                        "field": "TeacherId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Teacher",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Lecture",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "beginning": {
                        "type": Sequelize.INTEGER,
                        "field": "beginning",
                        "allowNull": false
                    },
                    "end": {
                        "type": Sequelize.INTEGER,
                        "field": "end",
                        "allowNull": false
                    },
                    "days": {
                        "type": Sequelize.STRING,
                        "field": "days",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    },
                    "FacultyId": {
                        "type": Sequelize.INTEGER,
                        "field": "FacultyId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Faculty",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "SubjectId": {
                        "type": Sequelize.INTEGER,
                        "field": "SubjectId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Subject",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "TeacherId": {
                        "type": Sequelize.INTEGER,
                        "field": "TeacherId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Teacher",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "RoomId": {
                        "type": Sequelize.INTEGER,
                        "field": "RoomId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Room",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Participations",
                {
                    "LectureId": {
                        "type": Sequelize.INTEGER,
                        "field": "LectureId",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "Lecture",
                            "key": "id"
                        },
                        "primaryKey": true
                    },
                    "StudentId": {
                        "type": Sequelize.INTEGER,
                        "field": "StudentId",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "Student",
                            "key": "id"
                        },
                        "primaryKey": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "BuildingInfo",
                {
                    "BuildingId": {
                        "type": Sequelize.INTEGER,
                        "field": "BuildingId",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "Building",
                            "key": "id"
                        },
                        "primaryKey": true
                    },
                    "FacultyId": {
                        "type": Sequelize.INTEGER,
                        "field": "FacultyId",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "Faculty",
                            "key": "id"
                        },
                        "primaryKey": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "deletedAt": {
                        "type": Sequelize.DATE,
                        "field": "deletedAt"
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["Administrator", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Building", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Faculty", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Lecture", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Participations", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Room", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["School", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Specialization", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Student", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Subject", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Teacher", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["User", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["BuildingInfo", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
