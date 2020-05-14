const mysql = require('mysql');
module.exports = (RoomName, Id_User, RESPONSE) => {
    let user_data;
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        // Получение id комнаты по ее названию
        connection.query("SELECT id FROM rooms WHERE name = " +
        "'" + RoomName + "'",
        (err, res) => {
            if (err) throw err;
            let room_id = res[0]['id'];
            // Запись в таблицу users_in_rooms
            connection.query("INSERT INTO users_in_rooms VALUES (" +
            Id_User + ", " +
            room_id + 
            ")",
            (err, res) => {
                if (err) throw err;
                // Нужно получить данные по добавленному пользователю
                connection.query("SELECT * FROM users WHERE id = " +
                Id_User,
                (err, res) => {
                    if (err) throw err;
                    user_data = res[0];
                    // console.log(user_data);
                    response(user_data);
                });
            });
        });
    })
    .then(
        (user_data) => {
            // console.log(data);
            connection.end();
            console.log('Пользователь добавлен в комнату');
            RESPONSE.send({
                data: JSON.stringify(user_data)
            });
        }
    );
}