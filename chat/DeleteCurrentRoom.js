const mysql = require('mysql');
module.exports = (RoomName, RESPONSE) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    let dropTable = new Promise(function(response, reject){
        connection.query("DROP TABLE " + RoomName, 
        (err, res) => {
            if (err) throw err;
            response();
            });
        });
    let deleteUsers_in_Rooms = new Promise(function(response, reject){
        connection.query(
            "DELETE FROM users_in_rooms WHERE room_id IN (" +
                "SELECT id FROM rooms WHERE name = " +
                "'" + RoomName + "'" +
            ")",
        (err, res) => {
            if (err) throw err;
            connection.query(
                "DELETE FROM rooms WHERE name = " +
                "'" + RoomName + "'",
            (err, res) => {
                if (err) throw err;
                response("Данные по комнате удалены");
            });
        })
    });
    Promise.all([dropTable, deleteUsers_in_Rooms], null)
    .then(
        (message) => {
            console.log('Данные о комнате из БД стерты');
            connection.end();
            RESPONSE.send({
                data: message
            });
        }
    );
}