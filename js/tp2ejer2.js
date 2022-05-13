$(document).ready(function () {

    $.get("../assets/texto1.txt",
        function (data) {
            $("#nav-home").html(data);
        },
    );

    $.get("../assets/texto2.txt",
        function (data) {
            $("#nav-profile").html(data);
        },
    );

    $.get("../assets/texto3.txt",
        function (data) {
            $("#nav-contact").html(data);
        },
    );
    
});