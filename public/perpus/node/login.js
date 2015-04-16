function login(req, res) {
    var met = req.method
    var p = req.body.pengguna
    var s = req.body.sandi
    if (met === 'POST' && p === 'admin' && s === 'admin') {
        res.send(true)
    } else {
        res.send(false)
    }
}

module.exports = login