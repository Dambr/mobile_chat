const mysql = require('mysql');
module.exports = (Login, Password) => {
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        connection.query("SELECT password FROM users WHERE login =" +
        "'" + Login + "'", 
        (err, res) => {
            if (err) throw err;
            let password = res[0]['password'];
            if (password == Password) {
                response();
            } else {
                reject();
            }
        });
    })
    .then(
        () => {
            console.log('Пользователь прошел проверку');
            connection.end();
            // return () => true;
        }
    )
    .catch(
        () => {
            console.log("Пользователь НЕ прошел проверку");
            connection.end();
            // return () => false;
        }
    );
}