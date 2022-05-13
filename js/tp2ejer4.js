$(document).ready(function () {

    // Borra el texto de los mensajes error
    const limpiarfeed = function(){
        $('.msjErr').html("");
    }

    // Boton Borrar. Limpia los inputs
    $('#borrar').on('click',function(e){
        e.preventDefault()
        $('input, textarea').val("");
        limpiarfeed();
    });

    //Validacion de datos del formulario
    validacion=function(){
        limpiarfeed();
        let $nomb = $("#nombre").val();
        let $emp = $("#empresa").val();
        let $tel = $("#telefono").val();
        let $email = $("#email").val();
        let $resp = true;
        let $char = null;

        //check nombre
        if ($nomb.length == 0){
            $resp = false;
            $('#nombre-feed').html('Ingrese un nombre');
        }
        if ($nomb.length > 30){
            $resp = false;
            $('#nombre-feed').html('No debe superar los 30 caracteres');
        }
        let $arrNombre = $nomb.split("");
        $.each($arrNombre,function(index,item){
            $char = parseInt(item); //isNaN toma como 0 a los espacios vacios, chan.
            if (!isNaN($char)){
                $resp=false;
                $('#nombre-feed').html('No se permiten numeros');
            }
        })

        //check empresa
        if ($emp.length == 0){
            $resp = false;
            $('#empresa-feed').html('Ingrese empresa');
        }
        if ($emp.length > 50){
            $resp = false;
            $('#empresa-feed').html('No debe superar los 50 caracteres');
        }

        //check telefono
        if ($tel.length == 0){
            $resp = false;
            $('#telefono-feed').html('Ingrese un numero');
        }
        if ($tel.length > 20){
            $resp = false;
            $('#telefono-feed').html('No debe superar los 20 caracteres');
        }
        var $arrTel = $tel.split("");
        $.each($arrTel,function(index,item){
            if (isNaN(item)){
                $resp=false;
                $('#telefono-feed').html('No se permiten letras');
            }
        })

        //check email
        if ($email.length == 0){
            $resp = false;
            $('#email-feed').html('Ingrese un email');
        } else {
            var $arrEmail= $email.split("");
            var $arroba=false;
            var $punto=false;
            $.each($arrEmail,function(index,item){
                if (item == "@"){
                    $arroba=true;
                }
                if (item=="."){
                    $punto=true;
                }
            })
            if ($arroba && $punto){
                $arrEmail=$email.split(".");
                if ($arrEmail[1]=="com"){
                    var $array2=$arrEmail[0].split("@");
                    if(!($array2[1]=="gmail" || $array2[1]=="hotmail" || $array2[1]=="yahoo")){
                        $resp=false;
                        $('#email-feed').html('Ingrese un email valido');
                    }
                }else{
                    $resp=false;
                    $('#email-feed').html('Ingrese un email valido');
                }
            }else{
                $resp=false;
                $('#email-feed').html('Ingrese un email valido');
            }
        }
        return $resp;
    }
    
    // Boton Enviar. Si los datos del formulario son validos los carga en la base.
    $('#enviar').on('click',function(e){
        $resp = validacion();
        if (!$resp){
            e.preventDefault();
        }else{
            var nombre = $('#nombre').val().toLowerCase();
            var empresa = $('#empresa').val().toLowerCase();
            var telefono = $('#telefono').val();
            var email = $('#email').val().toLowerCase();
            var comentario = $('#comentario').val();
            $.ajax({
                url: 'php/ejer4Subir.php',
                type: 'POST',
                data: { nombre: nombre,
                        empresa: empresa,
                        telefono: telefono,
                        email: email,
                        comentario: comentario
                    }
            })
            .done(function(info){
                alert(info);
            })
            .fail(function(info){
                alert(info);
            })
        }
    });

    // Validacion de usuario preexistente
    $('#empresa').on('change',function(){
        let empresa = $(this).val().toLowerCase();
        // $('#nombre-feed').html('');
        $.get('php/ejer4Validacion.php', {empresa: empresa}, function(rta){
            if (rta){
                $('#empresa-feed').html('La empresa ya esta en nuestra base de datos.');
            } else{
                $('#empresa-feed').html('');
            }
        });
    });
    

});