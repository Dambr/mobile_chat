const mysql = require('mysql');
module.exports = (RoomName) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    let dropTable = new Promise(function(response, reject){
        connection.query("DROP TABLE " + RoomName, 
        (err, res) => {
            if (err) throw err;
            response();
            });
        });
    let deleteRoom = new Promise(function(response, reject){
        connection.query(
            "DELETE FROM rooms WHERE name = " +
            "'" + RoomName + "'",
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
            response();
        })
    });
    Promise.all([dropTable, deleteRoom, deleteUsers_in_Rooms], null)
    .then(
        () => {
            console.log('Данные стерты');
            connection.end();
        }
    );
}