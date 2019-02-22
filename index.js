const express = require('express');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {filename: './dev.sqlite3'},
    useNullAsDefault: true,
}

const db = knex('knexConfig');

const server = express();
server.use(express.json());

const port = 3300;
server.listen(port, function(){
    console.log(`Server listening on port 3300`);
})