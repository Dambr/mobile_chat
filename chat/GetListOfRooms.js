const mysql = require('mysql');
module.exports = (Login) => {
    let result;
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        connection.query("SELECT name FROM rooms WHERE id IN " +
        "(" +
            "SELECT room_id FROM users_in_rooms WHERE user_id = (" +
                "SELECT id FROM users WHERE login = " +
                "'" + Login + "')" +
        ")", (err, res) => {
            if (err) throw err;
            result = [];
            res.forEach(element => {
                result.push(element.name);
            });
            response();
        });
    })
    .then(
        () => {
            console.log('Данные по комнатам получены');
            connection.end();
            return result;
        }
    );
}