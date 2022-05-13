$(document).ready(function(){

    $.getJSON('php/ejer5.php', function(data){
        // Cantidad de usuarios. Para generar las tablas.
        let $cantUs = data.length;
        document.getElementById('cantUs').value = $cantUs;
        let $cantPag = $cantUs/10;
        $cantPag = Math.ceil($cantPag); // Redondea para arriba. Cantidad de paginas a usar
        document.getElementById('cantPag').value = $cantPag;
        if ($cantPag>1){
            document.getElementById('pagActual').value = 1;
            $('#sig').removeClass("d-none");
        }
        if ($cantUs>0){
            document.getElementById('contUs').value = 0;
            dibujarTabla(data);
        }
    });
    
    $('#sig').on('click',function(){
        let $pagActual = parseInt(document.getElementById('pagActual').value);
        $pagActual++;
        document.getElementById('pagActual').value = ($pagActual);
        if ($pagActual>1){
            $('#ant').removeClass("d-none");
        }
        let $cantPag=parseInt(document.getElementById('cantPag').value);
        if ($pagActual == $cantPag){
            $('#sig').addClass("d-none");
        }
        $.getJSON('php/ejer5.php',function(data){
            dibujarTabla(data);
        })
    })

    $('#ant').on('click',function(){
        let $pagActual = parseInt(document.getElementById('pagActual').value);
        let $cantPag = parseInt(document.getElementById('cantPag').value);
        let $cantUs = parseInt(document.getElementById('cantUs').value);
        let $cuenta;
        if ($pagActual == $cantPag){
            $cuenta = ($cantUs-(($pagActual-1)*5));
            $cuenta = $cuenta+5;
        }else{
            $cuenta = 10;
        }
        $pagActual--;
        document.getElementById('pagActual').value = ($pagActual);
        if ($pagActual <= 1){
            $('#ant').addClass("d-none");
        }
        
        if ($pagActual < $cantPag){
            $('#sig').removeClass("d-none");
        }
        $.getJSON('php/ejer5.php',function(data){
            let $contUs = parseInt(document.getElementById('contUs').value);
            document.getElementById('contUs').value=($contUs-$cuenta);
            dibujarTabla(data);
        })
    })

    dibujarTabla=function(data){
        let i=1;
        let contenido;
        let $cantUs=parseInt(document.getElementById('cantUs').value);
        let $contUs=parseInt(document.getElementById('contUs').value);
        while (i<=10 && $contUs<$cantUs){
            contenido+=`<tr>
                <th scope="col">${$contUs+1}</th>
                <th scope="col">${data[$contUs].nombre}</th>
                <th scope="col">${data[$contUs].empresa}</th>
                <th scope="col">${data[$contUs].telefono}</th>
                <th scope="col">${data[$contUs].email}</th>
              </tr>`;
            $contUs++;
            i++;
        }
        $('#tabla').html(contenido);
        document.getElementById('contUs').value=$contUs;
    }
})


