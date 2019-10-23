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
                $(".login-form").addClass("was-validated");
                if (error.responseText == "Incorrect email.") {
                    var txt = $('<div class="invalid-feedback"></div>').text("Incorrect email."); // Create text with jQuery
                    $("#email-form").after(txt); // Append new elements
                    //$("#email").after('<div class="invalid-feedback"></div>');

                } else if (error.responseText == "Incorrect password.") {
                    $("#email").after('<div class="invalid-feedback">Incorrect password..</div>');

                }
            }
        });

    });
});