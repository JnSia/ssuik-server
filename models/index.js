const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Advertisement = require('./advertisement');

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Advertisement = Advertisement;

User.init(sequelize);
Advertisement.init(sequelize);

User.associate(db);
Advertisement.associate(db);

module.exports = db;
