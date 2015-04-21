var roundDecimal = require('./lib/roundDecimal')

function bacaPeringkat(req, res) {
    var db = require('./db')()

    var items = []
    var p = 1
    db.each("SELECT * FROM peringkat", function(err, baris) {
        if (err) {
            console.error('Gagal baca data.')
            console.error(err)
            res.send()
            return
        }
        items.push({
            peringkat: p++,
            judul: baris.judul,
            pengarang: baris.pengarang,
            skor: roundDecimal(baris.skor, 5)
        })
    }, function() {
        console.log('\nterima data:')
        console.log(items)
        console.log()
        res.send(items)
    })

    db.close()
}

module.exports = bacaPeringkat