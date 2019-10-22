$(document).ready(function() {
            $(".login-form").on("submit", (function(e) {
                    e.preventDefault();
                    var data = {
                        email: $("#email").val(),
                        password: $("#password").val()
                    };

                    $.ajax({
                        type: "POST",
                        url: "/api/login",
                        data: data,
                        success: function(sas) {
                            console.log("success");
                            data = {};
                        },
                    });

                });
            });