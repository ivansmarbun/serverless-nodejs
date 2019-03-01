const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'postgres://plbxcshd:POSGb8AN29VV9p5uD3qHvYsIA9cuZCmA@baasu.db.elephantsql.com:5432/plbxcshd'
);

const todo = require('./models/todo')(sequelize, Sequelize);

const db = {
  Sequelize,
  sequelize,
  todo
};

db.sequelize.sync(/*{ force: true }*/);

module.exports = db;
