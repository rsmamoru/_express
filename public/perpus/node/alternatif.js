function bacaAlt(req, res) {
    var db = require('./db')()

    db.all("SELECT * FROM alternatif", function(err, data) {
        if (err) {
            console.error('Gagal baca data.')
            console.error(err)
            res.send()
            return
        }
        res.send(data)
    })

    db.close()
}

module.exports = bacaAlt