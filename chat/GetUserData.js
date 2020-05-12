const mysql = require('mysql');
module.exports = (Login) => {
    let result;
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        connection.query("SELECT * FROM users WHERE login =" +
        "'" + Login + "'", 
        (err, res) => {
            if (err) throw err;
            console.log(res);
            res = res[0];
            delete res.password;
            result = res;
            response();
        });
    })
    .then(
        () => {
            console.log('Данные по пользователю получены');
            console.log(result);
            connection.end();
            return result;
        }
    );
}