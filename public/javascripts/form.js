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
                console.log("success");
                console.log(data);
                console.log(sas);


                data = {};
                console.log(data);
            },
            error: function(error) {
                console.log(error.responseText);
            }

        });

    });
});