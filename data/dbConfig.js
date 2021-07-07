const knex = require('knex');
const config = require('../knexfile.js');

// knex expects a config object
module.exports = knex(config.development);