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
                window.location.replace("http://localhost:3000/dashboard");
            },
            error: function(error) {
                if (error.responseText == "Incorrect email.") {
                    $(".invalid-feedback").empty();
                    $(".email-form").addClass("is-invalid");
                    var txt = "Email is not registered.";
                    $(".invalid-feedback").append(txt);

                } else if (error.responseText == "Incorrect password.") {
                    $(".invalid-feedback").empty();
                    $(".password-form").addClass("is-invalid");
                    var txt = "Incorrect password";
                    $(".invalid-feedback").append(txt);

                }
            }
        });

    });
});