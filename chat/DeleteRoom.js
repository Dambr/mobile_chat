const mysql = require('mysql');
module.exports = (RoomName) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        connection.query("DROP TABLE " + RoomName, 
        (err, res) => {
            if (err) throw err;
            connection.query("DELETE FROM rooms WHERE name = " +
            "'" + RoomName + "'",
            (err, res) => {
                if (err) throw err;
                let roomId = RoomName.split('_');
                roomId = roomId[roomId.length - 1];
                connection.query("DELETE FROM users_in_rooms WHERE room_id = " +
                roomId
                );
                response();
            });
        });
    })
    .then(
        () => {
            console.log('Таблица удалена');
            connection.end();
        }
    );
}