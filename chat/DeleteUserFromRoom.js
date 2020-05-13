const mysql = require('mysql');
module.exports = (UserId, RoomName) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        connection.query(
            "DELETE FROM users_in_rooms WHERE room_id IN (" + 
                "SELECT id FROM rooms WHERE name = " + 
                "'" + RoomName + "'" +
            ")" + 
            " AND user_id = " + 
            UserId,
            (err, res) => {
                if (err) throw err;
                response();
            }
        );
    })
    .then(
        () => {
            console.log('Пользователь из комнаты удален');
            connection.end();
        }
    );
}