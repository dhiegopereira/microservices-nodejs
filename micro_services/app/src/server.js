const seneca = require('./seneca');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json('Microservices on port 8080');
});

app.get('/docker/status', (req, res) => {
    seneca.act({ role: 'api', action: 'status' }, (err, response) => {
        if (err) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.status(200).json(response);
        }
    });
});

app.get('/docker/:serviceName/:action', async (req, res) => {
    const { serviceName, action } = req.params;
    seneca.act({ role: 'api', action: action, serviceName: serviceName }, (err, response) => {
        if (err) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.status(200).json(response);
        }
    });   
});

module.exports = app;
