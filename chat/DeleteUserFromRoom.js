const mysql = require('mysql');
module.exports = (UserId, RoomName) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        let room_id = RoomName.split('_');
        room_id = room_id[room_id.length - 1];
        connection.query("DELETE FROM users_in_rooms WHERE " +
            "room_id = " + room_id + 
            " AND " + 
            "user_id = " + UserId,
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