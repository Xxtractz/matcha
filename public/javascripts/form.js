$("login.ejs").ready(function() {
    $(".login-form").submit(function(e) {
        e.preventDefault();
        var data = {
            email: $("#email").val(),
            password: $("#password").val()
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/user/api/login",
            data: data,
            success: function(success) {
                $("#div1").html(result);
                console.log(data);
                console.log(success);


                data = {};
                console.log(data);
            },
            error: function(error) {
                if (error.responseText == "") {
                    $("#div1").html(result);

                } else {
                    $("#div1").html(result);
                }
            }
        });

    });
});