let sql = require('mssql');
let config = {
    server: 'memorygame.database.windows.net',
    database: 'artistsDB',
    user: 'younhee',
    password: '4wnr8dmadbs!',
    encrypt : true
};
const conn = new sql.ConnectionPool(config);

module.exports = conn;



//mongodb+srv://younhee:4wnr8dmadbs!@cluster0-rprqx.azure.mongodb.net/test?retryWrites=true&w=majority




