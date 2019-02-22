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

// Get Projects (Testing Purposes)
server.get('/api/projects', async (req, res) => {
    try{
        const projects = await db('projects');
        res.status(200).json(projects);
    } catch(error) {
        res.status(500).json(error);
    }
})

// Get Project By ID
server.get('/api/projects/:id', async (req, res) => {
    try{
        const project = await db('projects')
            .where({ id: req.params.id })
            .first();
        res.status(200).json(project);
    } catch(error) {
        res.status(500).json(error);
    }
});

const port = 3300;
server.listen(port, function(){
    console.log(`Server listening on port 3300`);
})