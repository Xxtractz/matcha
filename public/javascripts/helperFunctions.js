function sendlogin(data, url) {
    //ajax call here

    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(sas) {

        },
    });
}