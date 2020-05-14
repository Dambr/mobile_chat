const mysql = require('mysql');
module.exports = (RoomName, userData, RESPONSE) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    let Participants = new Promise(function(response, reject){
        // Получаем все данные пользователям, которые сидят в текущей комнате
        connection.query(
        "SELECT * FROM users WHERE id IN (" +
            "SELECT user_id FROM users_in_rooms WHERE room_id IN (" +
                "SELECT id FROM rooms WHERE name = " +
                "'" + RoomName + "'" +
            ")" +
        ")",
        (err, res) => {
            if (err) throw err;
            response(res);
        });
    });
    let LastMessages = new Promise(function(response, reject){
        // Получаем данные по последним сообщениям
        connection.query(
        "SELECT * FROM " + 
        RoomName +
        " ORDER BY id DESC LIMIT 5",
        (err, res) => {
            if (err) throw err;
            response(res);
        });
    });
    Promise.all([Participants, LastMessages]).then((values => {
        connection.end();
        RESPONSE.render('room.ejs', {
            userData: userData,
            roomName: RoomName,
            participants: JSON.stringify(values[0]),
            lastMessages: JSON.stringify(values[1])
        });
    }));
}