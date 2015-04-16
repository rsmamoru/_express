var reload = require('require-reload')(require)
var roundDecimal = require('./lib/roundDecimal')

function bacaPeringkat(req, res) {
    var db = reload('./db')()

    var items = []
    var p = 1
    db.each("SELECT * FROM peringkat", function(err, baris) {
        if (err) throw err
        items.push({
            peringkat: p++,
            nip: baris.pengguna,
            nama: baris.nama,
            skor: roundDecimal(baris.skor, 5)
        })
    }, function() {
        console.log('terima data: ' + JSON.stringify(items))
        res.send(items)
    })

    db.close()
}

module.exports = bacaPeringkat