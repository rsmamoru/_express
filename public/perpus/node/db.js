function bukaDB() {
    var sqlite3 = require('sqlite3').verbose()
    return new sqlite3.Database(__dirname + '/db/spkmojo.db')
}

module.exports = bukaDB