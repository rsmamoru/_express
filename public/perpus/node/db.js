function bukaDB() {
    var sqlite3 = require('sqlite3')
    return new sqlite3.Database(__dirname + '/db/spkwglib.db')
}

module.exports = bukaDB