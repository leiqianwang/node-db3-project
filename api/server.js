const express = require('express');
const knexConfig = require('../knexfile').development;
const knex = require('knex')(knexConfig);

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());
server.use('/api/schemes', SchemeRouter(knex));


const port = 9000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


module.exports = server;