const mysql = require('mysql');
module.exports = (UserId, RoomName) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    let room_id;
    new Promise(function(response, reject){
        connection.query("SELECT id FROM rooms WHERE name = " + 
        "'" + RoomName + "'",
        (err, res) => {
            if (err) throw err;
            room_id = res[0]['id'];
            connection.query("INSERT INTO users_in_rooms VALUES(" +
                UserId + "," +
                room_id +
                ")",
                (err, res) => {
                    if (err) throw err;
                    response();
                }
            );
        });
    })
    .then(
        () => {
            console.log('Пользователь в комнату добавлен');
            connection.end();
        }
    );
}