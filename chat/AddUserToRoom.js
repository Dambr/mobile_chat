const mysql = require('mysql');
module.exports = (UserId, RoomName) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        let room_id = RoomName.split('_');
        room_id = room_id[room_id.length - 1];
        connection.query("INSERT INTO users_in_rooms VALUES(" +
            UserId + "," +
            room_id +
            ")",
            (err, res) => {
                if (err) throw err;
                response();
            }
        );
    })
    .then(
        () => {
            console.log('Пользователь в комнату добавлен');
            connection.end();
        }
    );
}