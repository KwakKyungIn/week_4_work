
const { Sequelize } = require("sequelize");
const Student = require('./student');
const Classes = require('./classes');
const List = require('./list');

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize( //config의 db정보와 연결
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.Student = Student;
Student.init(sequelize);
Student.associate(db);

db.Classes = Classes;
Classes.init(sequelize);
Classes.associate(db);

db.List = List;
List.init(sequelize);
List.associate(db);

module.exports = db;