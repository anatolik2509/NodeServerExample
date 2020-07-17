module.exports = function (app) {
    app.get('/profile', (request, response) => {
        var result = {
            "first_name":"Antonov",
            "last_name":"Anatoly",
            "age":18,
            "phone":"89063211692",
            "email":"antonov250901@mail.ru",
            "profession":"Student",
            "skills":["bababa", "bebebe"],
            "info":"Учусь в итисе. Сейчас сижу, вёрстку изучаю."
        }
        response.send(JSON.stringify(result));
    });
};