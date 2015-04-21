function goLogin() {
    lebar_bg = parseInt($('.h_bg').css('width'))
    lebar_login = parseInt($('.login').css('width'))
    left_login = (lebar_bg - lebar_login) / 2
    $('.login').css('left', left_login)
    $('.login').css('display', 'block')
}
function goLogout() {
    $('#menukelola').css('display', 'none')
    $('#menulogin').css('display', 'block')
    $('.divContent').fadeOut(700)
    $('.slider-wrapper').css('visibility', 'visible')
}
function proclogin(pengguna, sandi) {
    $.ajax({
        type: "POST",
        url: "login",
        data: "pengguna="+pengguna + "&sandi="+sandi,
        success: function(res) {
            //alert(JSON.stringify(res))
            if (res) {
                goKelola()
            } else {
                $('#nologin').css('visibility', 'visible')
            }
        },
        error: function(res) {
            alert(JSON.stringify(res))
            $('#nologin').css('visibility', 'visible')
        }
    })
}
function goKelola() {
    $('#pengguna').val('')
    $('#sandi').val('')
    $('#nologin').css('visibility', 'hidden')

    $('#menulogin').css('display', 'none')
    $('.login').css('display', 'none')
    $('.active').removeClass('active')
    $('#logout').addClass('active')
    $('#menukelola').css('display', 'block')
}
function go(id) {
    $('.active').removeClass('active')
    $('#' + id).addClass('active')
    $('.slider-wrapper').css('visibility', 'hidden')
    procContent(id + '.htm')
}
function procContent(berkas){
    $.ajax({
        type: "POST",
        url: "grid/"+berkas,
        success: function(res) {
            $(".divContent").html(res)
            $('.divContent').fadeIn(700)
        }
    })
}

function cetak(judul, deskripsi, grid) {
    var bernomor = grid.jqGrid("getGridParam", "rownumbers");
    var cm = grid.jqGrid("getGridParam", "colModel");
    var dt = grid.jqGrid("getRowData");

    // Kurung awal tabel.
    var tableString = '<table cellspacing="0" class="pb">';

    // Kepala tabel.
    tableString += '\n<tr>';
    if (bernomor) tableString += '<th>#</th>';
    for (k=0; k<cm.length; k++) {
        if (cm[k].label && !cm[k].nonprint) {
            tableString += '<th width="' + cm[k].width + '">' + cm[k].label + '</th>';
        }
    }
    tableString += '\n</tr>';

    // Isi tabel.
    for (b=0; b<dt.length; b++) {
        tableString += '\n<tr>';
        if (bernomor) {
            urut = b + 1;
            tableString += '<td>' + urut + '</td>';
        }
        for (k=0; k<cm.length; k++) {
            if (cm[k].label && !cm[k].nonprint) {
                tableString += '<td'
                if (cm[k].align) tableString += ' style="text-align:' + cm[k].align + ';"';
                if (cm[k].classes) tableString += ' class="' + cm[k].classes + '"';
                tableString += '>' + dt[b][cm[k].name] + '</td>';
            }
        }
        tableString += '\n</tr>';
    }

    // Kurung tutup tabel.
    tableString += '\n</table>';
    //alert(tableString);

    // Print Preview & Print.
    var w = window.open("grid/cetak.htm", judul, "width=800,height=600");
    var wol = function() {
        w.document.title = judul;
        c = $(w.document).contents();
        c.find('h2').html(judul);
        c.find('h4').html(deskripsi);
        c.find('#isi').html(tableString);
        setTimeout(function(){ w.print() },1000);
    };
    w.onload = new wol() && function(){ wol() };
}