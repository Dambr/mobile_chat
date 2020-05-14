const mysql = require('mysql');
module.exports = (RoomName, Id_Admin, RESPONSE) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        connection.query("SELECT id_admin FROM rooms WHERE name = " +
        "'" + RoomName + "'",
        (err, res) => {
            if (err) throw err;
            let id_admin = res[0]['id_admin'];
            if (Id_Admin == id_admin){
                response();
            }
            else{
                reject();
            }
        });
    })
    .then(
        () => {
            connection.end();
            RESPONSE.send({
                data: true
            });
        }
    )
    .catch(
        () => {
            connection.end();
            RESPONSE.send({
                data: false
            });
        }
    )
}