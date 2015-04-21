var db, p

function bacaBuku(req, res) {
    db = require('./db')()
    p = req.body
    console.log('\npengajuan:')
    console.log(p)
    console.log()

    // Tambah-Ubah-Hapus.
    if (p.oper) {
        console.log('operasi: ' + p.oper)
        switch (p.oper) {
            case 'add': tambahBuku(); break;
            case 'edit': ubahBuku(); break;
            case 'del': hapusBuku(); break;
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
    var hlmn = parseInt(p.page)
    var batas = parseInt(p.rows)
    var sidx = p.sidx
    var sord = p.sord
    if(!sidx) sidx = 1
    var mulai = 0
    db.serialize(function() {
        db.get("SELECT COUNT(*) AS jumlah FROM buku", function(err, baris) {
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
        db.all("SELECT * FROM buku ORDER BY "+sidx+" "+sord+" LIMIT ? , ?", mulai, batas, function(err, data) {
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

    db.close()
}

function tambahBuku() {
    var nilai = [p.judul, p.pengarang, p.penerbit, p.kota, p.tahun, p.nomor_buku]
    db.run("INSERT INTO buku(judul, pengarang, penerbit, kota, tahun, nomor_buku) VALUES(?, ?, ?, ?, ?, ?)", nilai, function(err) {
        if (err) {
            console.error('Gagal tambah data.')
            console.error(err)
        }
    })
    db.close()
}

function ubahBuku() {
    var nilai = [p.judul, p.pengarang, p.penerbit, p.kota, p.tahun, p.nomor_buku, p.id_buku]
    db.run("UPDATE buku SET judul=?, pengarang=?, penerbit=?, kota=?, tahun=?, nomor_buku=? WHERE id_buku=?", nilai, function(err) {
        if (err) {
            console.error('Gagal ubah data.')
            console.error(err)
        }
    })
    db.close()
}

function hapusBuku() {
    db.run("DELETE FROM buku WHERE id_buku=?", p.id_buku, function(err) {
        if (err) {
            console.error('Gagal hapus data.')
            console.error(err)
        }
    })
    db.close()
}

module.exports = bacaBuku