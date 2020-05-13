const mysql = require('mysql');
module.exports = (RoomName, id_admin, RESPONSE) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        // Определения id, с которым нужно создать комнату в названии
        connection.query("SELECT COUNT(id) FROM rooms", 
        (err, res)=>{
            if (err) throw err;
            let currentId = res[0]['COUNT(id)'] + 1;
            RoomName += '_' + currentId;
            // создание отдельной таблицы для новой комнаты
            connection.query("CREATE TABLE " + RoomName + 
            "(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
            "message TEXT NOT NULL," +
            "author TEXT NOT NULL," +
            "date DATETIME NOT NULL)", 
            // запись в таблицу rooms о том, что создана новая комната
            (err, res) => {
                if (err) throw err;
                connection.query("INSERT INTO rooms VALUES(" + 
                // id - AUTO_INCREMENT
                null + ", " +
                // оборачиваем название комнаты в одинарные ковычки
                // чтобы записалось
                "'" + RoomName + "'" +
                ")", 
                (err, res) => {
                    if (err) throw err;
                    // добавление значений 
                    // в таблицу соответствий пользователей и комнат
                    connection.query("INSERT INTO users_in_rooms VALUES(" + 
                    id_admin + "," + 
                    currentId + 
                    ")",
                    (err, res) => {
                        if (err) throw err;
                        response();
                    });
                });
            });
        });
    })
    .then(
        () => {
            console.log('Новая таблица создана');
            connection.end();
            RESPONSE.send({
                data: RoomName
            });
        }
    );
}