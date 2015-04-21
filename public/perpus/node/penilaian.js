var db, p

function bacaNilai(req, res) {
    db = require('./db')()
    p = req.body

    // Tambah-Ubah.
    if (p.oper) {
        for (var n in p) {
            p.id_krit = n
            p.nilai = p[n]
            break
        }
        console.log('\npengajuan:')
        console.log(p)
        console.log()

        simpanNilai()
        res.send()
        return
    }

    // Nilai Total Integral.
    if (p.integral) {
        console.log('\npengajuan:')
        console.log(p)
        console.log()

        simpanIntegral()
        res.send()
        return
    }

    // Baca.
    db.all("SELECT * FROM penilaian", function(err, data) {
        if (err) {
            console.error('Gagal baca data.')
            console.error(err)
            return
        }
        res.send(data)
    })
    db.close()
}

function simpanNilai() {
    db.run("UPDATE penilaian SET nilai=? WHERE alternatif=? AND kriteria=?", p.nilai, p.id_alt, p.id_krit)
    db.run("INSERT OR IGNORE INTO penilaian VALUES(?, ?, ?)", p.id_alt, p.id_krit, p.nilai)
    db.close()
}

function simpanIntegral() {
    var id_alt = JSON.parse(p.id_alt)
    var skor = JSON.parse(p.skor)
    for (b=0;b<id_alt.length;b++) {
        db.run("UPDATE integral SET skor=? WHERE alternatif=?", skor[b], id_alt[b])
        db.run("INSERT OR IGNORE INTO integral VALUES(?, ?)", id_alt[b], skor[b])
    }
    db.close()
}

module.exports = bacaNilai