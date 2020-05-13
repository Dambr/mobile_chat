const mysql = require('mysql');
module.exports = (RoomName, Message, Author) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    let date = new Date().toISOString().split('.')[0].replace('T', ' ');
    new Promise(function(response, reject){
        connection.query(
        "INSERT INTO" + 
        " " + RoomName.trim() + " " +
        "VALUES (" +
        null + ", " +
        "'" + Message.trim() + "'" + ", " + 
        "'" + Author.trim() + "'" + ", " +
        "'" + date + "'" + 
        ")",
        (err, res) => {
            if (err) throw err;
            response();
        });
    })
    .then(
        () => {
            console.log('Сообщение в БД записано');
            connection.end();
        }
    );
}