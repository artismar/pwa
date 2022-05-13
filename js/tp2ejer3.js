$(document).ready(function () {
    // Expresion regular para sacar unicamente el numero del string.
    const regex = /(\d+)/g;
    
    // Clickeamos a la imagen y abrimo el modal con la informacion obtenida en la base de datos.
    $("#nav-tabContent img").click(function () { 
        let idArticulo = $(this).attr("src").match(regex).toString(); // Buscamos la informacion con el numero de la imagen.
        $.get("php/ejer3.php", {id: idArticulo},
            function (rta) {
                let data = JSON.parse(rta);
                $(".modal .modal-title").text(data.titulo);
                $(".modal .modal-body p").text(data.contenido);
            }
        );
        $(".modal").show();
    });
    
    // Ponemos un boton en el modal para ocultarlo
    $(".modal .btn-close").click(function () { 
        $(".modal").hide();
    });

});