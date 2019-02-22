const express = require('express');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {filename: './dev.sqlite3'},
    useNullAsDefault: true,
}

const db = knex(knexConfig);

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

// Get Actions (Testing Purposes)
server.get('/api/actions', async (req, res) => {
    try{
        const actions = await db('actions');
        res.status(200).json(actions);
    } catch(error) {
        res.status(500).json(error);
    }
})

// Get Action by ID
server.get('/api/actions/:id', async (req, res) => {
    try{
        const action = await db('actions')
            .where({ id: req.params.id})
            .first();
        res.status(200).json(action);
    } catch(error){
        res.status(500).json(error);
    }
})

// Get actions for specific projects
server.get('/api/projects/:id/', async (req, res) => {
    try {
        const projects = await db('projects').where({ id: req.params.id });
        const actionList = await db('actions').where({ project_id: req.params.id});
        if (projects.length){
            const project = projects[0];
            res.status(200).json({...project, actionList})
        } else {
            res.status(404).json({ message: "No actions for this project" });
        }
    } catch(error){
        res.status(500).json(error);
    }
})

// Add a project
server.post('/api/projects', async (req, res) => {
    try{
        const [id] = await db('projects').insert(req.body);
        const project = await db('projects')
            .where({ id })
            .first();
        res.status(201).json(project);
    } catch(error) {
        res.status(500).json(error);
    }
})

// Add an action
server.post('/api/actions', async (req, res) => {
    try {
        const [id] = await db('actions').insert(req.body);
        const action = await db('actions')
            .where({ id })
            .first();
        res.status(201).json(action);
    } catch(error) {
        res.status(500).json(error);
    }
})

// Update Project by ID
server.put('/api/projects/:id', async (req, res) => {
    try{
        const count = await db('projects')
            .where({ id: req.params.id })
            .update(req.body);
        if (count > 0){
            const project = await db('projects')
                .where({ id: req.params.id})
                .first();
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Could not update this project bc I was not able to find it' });
        }
    } catch(error){
        res.status(500).json(error)
    }
})

const port = 3300;
server.listen(port, function(){
    console.log(`Server listening on port 3300`);
})