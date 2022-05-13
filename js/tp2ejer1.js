$(document).ready(function () {

    $.get("../assets/categorias.json",
        function (categoria) {
            categoria.forEach(element => {
                $("#categoria").append(`<option value="${element.id}">${element.nombre}</option>`);
            });
        }
    );
    
    $("#categoria").change(function () {
        $("#articulo").html(``);
        const idCategoria = $("#categoria option:selected").val();
        $.get("../assets/articulos.json",
        function (articulo) {
            articulo.forEach(element => {
                if (idCategoria == element.idCategoria){
                        $("#articulo").append(`<option value="${element.id}">${element.nombre}</option>`);
                    }
                });
            }
        );
    });

});