var xssF = require('xss-filters')
var db, p

function bacaKrit(req, res) {
    db = require('./db')()
    p = req.body
    console.log('\npengajuan:')
    console.log(p)
    console.log()

    // Tambah-Ubah-Hapus.
    if (p.oper) {
        console.log('operasi: ' + p.oper)
        if (p.bobot == '') p.bobot = 1
        for (var n in p) p[n] = xssF.inHTMLData(p[n])
        switch (p.oper) {
            case 'add': tambahKrit(); break;
            case 'edit': ubahKrit(); break;
            case 'del': hapusKrit(); break;
        }
        res.send()
        return
    }

    function gagalBaca(err) {
        console.error('Gagal baca data.')
        console.error(err)
        res.send()
    }

    // Baca.
    if (p.nd) {
        var hlmn = parseInt(p.page)
        var batas = parseInt(p.rows)
        var sidx = p.sidx
        var sord = p.sord
        if (!sidx) sidx = 1
        var mulai = 0
        db.serialize(function() {
            db.get("SELECT COUNT(*) AS jumlah FROM kriteria", function(err, baris) {
                if (err) {
                    gagalBaca(err)
                    return
                }
                var jumlah = baris.jumlah
                var total_hlmn = 0
                if (jumlah > 0 && batas > 0) total_hlmn = Math.ceil(jumlah/batas)
                if (hlmn > total_hlmn) hlmn = total_hlmn
                mulai = batas * hlmn - batas
                if (mulai < 0) mulai = 0
            })
            db.all("SELECT * FROM kriteria ORDER BY "+sidx+" "+sord+" LIMIT ? , ?", mulai, batas, function(err, data) {
                console.log('sidx: ' + sidx)
                console.log('sord: ' + sord)
                console.log('mulai: ' + mulai)
                console.log('batas: ' + batas)
                if (err) {
                    gagalBaca(err)
                    return
                }
                console.log('\nterima data:')
                console.log(data)
                console.log()
                res.send(data)
            })
        })
    } else {
        db.all("SELECT * FROM kriteria", function(err, data) {
            if (err) {
                gagalBaca(err)
                return
            }
            res.send(data)
        })
    }

    db.close()
}

function tambahKrit() {
    var nilai = [p.nama_krit, p.satuan, p.jenis, p.bobot]
    db.run("INSERT INTO kriteria(nama_krit, satuan, jenis, bobot) VALUES(?, ?, ?, ?)", nilai, function(err) {
        if (err) {
            console.error('Gagal tambah data.')
            console.error(err)
        }
    })
    db.close()
}

function ubahKrit() {
    var nilai = [p.nama_krit, p.satuan, p.jenis, p.bobot, p.id_krit]
    db.run("UPDATE kriteria SET nama_krit=?, satuan=?, jenis=?, bobot=? WHERE id_krit=?", nilai, function(err) {
        if (err) {
            console.error('Gagal ubah data.')
            console.error(err)
        }
    })
    db.close()
}

function hapusKrit() {
    db.run("DELETE FROM kriteria WHERE id_krit=?", p.id_krit, function(err) {
        if (err) {
            console.error('Gagal hapus data.')
            console.error(err)
        }
    })
    db.close()
}

module.exports = bacaKrit