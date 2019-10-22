$(document).ready(function() {
    $(".login-form").submit(function(e) {
        e.preventDefault();
        console.log("im on jquery");
        $(selector).die(eventType);
        var data = {
            username: $(".username").val(),
        };

        sendlogin(data, "http://localhost:3000/api/login");
    });
});