function procContent(berkas){
    $.ajax({
        type: "POST",
        url: "grid/"+berkas,
        success: function(res)
        {
            $(".divContent").html(res)
            $('.divContent').fadeIn(700)
        }
    })
}
