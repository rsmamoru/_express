var reload = require('require-reload')(require)

function prosesMuat(err, req, res, tujuan) {
    var muatan = './node/' + tujuan
    console.log('perpus memuat: ' + muatan)
    try {
        reload(muatan)(req, res)
        err.status = null
    } catch(e) {
        console.warn('Modul tidak ada atau ada kesalahan program.')
        err.status = 500
    }
}

function app(err, req, res) {
    var tujuan = req.path.split('/')[2]
    console.log('tujuan: ' + tujuan)
    if (tujuan) prosesMuat(err, req, res, tujuan)
/*
    switch (tujuan) {
        case 'login':
            prosesMuat(err, req, res, tujuan)
            break
        case 'peringkat':
            prosesMuat(err, req, res, tujuan)
            break
    }
*/
}

module.exports = app