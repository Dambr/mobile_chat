const mysql = require('mysql');
module.exports = (UserId, RoomName, RESPONSE) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        connection.query(
        "DELETE FROM users_in_rooms WHERE room_id IN " +
        "(" +
            "SELECT id FROM rooms WHERE name = " +
            "'" + RoomName + "'" +
        ")" +
        " AND " +
        "user_id = " +
        UserId,
        (err, res) => {
            if (err) throw err;
            response("Пользователь удален");
        });
    })
    .then(
        (message) => {
            console.log('Данные о пользователе стерты');
            connection.end();
            RESPONSE.send({
                data: message
            });
        }
    );
}