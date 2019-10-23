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
                localStorage.setItem("jwt", success)
                data = {};
                window.location.replace("http://localhost:3000/dashboard");
            },
            error: function(error) {
                if (error.responseText == "") {
                    $("#div1").html(error);

                } else {
                    $("#div1").html(error);
                }
            }
        });

    });
});