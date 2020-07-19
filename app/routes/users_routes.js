bodyParser = require("body-parser").json();

module.exports = function (app) {
    app.get('/profile', (request, response) => {
        let result = {
            "first_name":"Antonov",
            "last_name":"Anatoly",
            "age":18,
            "phone":"89063211692",
            "email":"antonov250901@mail.ru",
            "profession":"Student",
            "skills":["bababa", "bebebe"],
            "info":"Учусь в итисе. Сейчас сижу, вёрстку изучаю."
        }
        response.setHeader("Content-Type", "application/json");
        response.send(JSON.stringify(result));
    });

    app.post('/users', bodyParser, (request, response) => {
        let body = request.body;
        let responseBody = {
            id : Math.random(),
            "name" : body["name"]
        }

        response.setHeader("Content-Type", "application/json");
        response.send(JSON.stringify(result));
    });

    app.post('/resume', bodyParser, (request, response) => {
        let body = request.body;
        const {Client} = require('pg');
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            password: 'itis2020',
            database: 'mySiteDB'
        });
        const req = 'INSERT INTO resumes(name, phone, text) VALUES($1, $2, $3) RETURNING *';
        client.connect();
        client.query(req,
            [body['name'], body['phone'], body['text']],
            (err, data) => {
                response.setHeader("Content-Type", "application/json");
                response.send(JSON.stringify(data.rows));
                client.end();
            })
    });

    app.get('/resume', (request, response) => {
        const { Client } = require('pg');
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            password: 'itis2020',
            database: 'mySiteDB'
        });
        client.connect();
        client.query('SELECT name, phone, text FROM resumes', (err, data) => {
            response.setHeader("Content-Type", "application/json");
            response.send(JSON.stringify(data.rows));
            client.end();
        });
    });
};