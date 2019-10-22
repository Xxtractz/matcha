$(document).ready(function() {
    $(".login-form").submit(function(e) {
        e.preventDefault();
        console.log("im on jquery");
        var data = {
            email: $("#email").val(),
            password: $("#password").val()
        };

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(sas) {
                console.log("success");
                data = {};
            },
        });

    });
});