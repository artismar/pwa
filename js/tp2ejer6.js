$(document).ready(function () {
    $('#key').on('keyup', function () {
        var key = $(this).val();
        var dataString = 'key=' + key;
        $.ajax({
            type: "POST",
            url: "php/ejer6paises.php",
            data: dataString,
            success: function (data) {
                //Escribimos las sugerencias que nos manda la consulta
                $('#suggestions').fadeIn(1000).html(data);
                //Al hacer click en algua de las sugerencias
                $('.suggest-element').on('click', function () {
                    //Obtenemos la id unica de la sugerencia pulsada
                    var id = $(this).attr('id');
                    //Editamos el valor del input con data de la sugerencia pulsada
                    $('#key').val($('#' + id).attr('data'));
                    //Hacemos desaparecer el resto de sugerencias
                    $('#suggestions').fadeOut(1000);
                    document.querySelector('.idpais').id = id;
                    alert('Has seleccionado el ' + id + ' ' + $('#' + id).attr('data'));
                    return false;
                });
            }
        });
    });
});
$(document).ready(function () {
    $('#key2').on('keyup', function () {
        var pais = document.querySelector('.idpais').id;
        var key2 = $(this).val();

        var dataString = { 'key': key2, 'idpais': pais };

        $.ajax({
            type: "POST",
            url: "php/ejer6estados.php",
            data: dataString,
            success: function (data) {
                //Escribimos las sugerencias que nos manda la consulta
                $('#suggestions2').fadeIn(1000).html(data);
                //Al hacer click en algua de las sugerencias
                $('.suggest-element').on('click', function () {
                    //Obtenemos la id unica de la sugerencia pulsada
                    var id = $(this).attr('id');
                    //Editamos el valor del input con data de la sugerencia pulsada
                    $('#key2').val($('#' + id).attr('data'));
                    //Hacemos desaparecer el resto de sugerencias
                    $('#suggestions2').fadeOut(1000);
                    alert('Has seleccionado el ' + id + ' ' + $('#' + id).attr('data'));
                    return false;
                });
            }
        });
    });
});

$(document).ready(function () {
    //Validacion de usuario preexistente
$('#nombre').on('change',function(){
//$('#nombre-feed').html('');
$.getJSON('php/ejer4Validacion.php',function(data){
var $nombre=document.getElementById('nombre').value;
$nombre=$nombre.toLowerCase();
$.each(data,function (index,item){
    $nombreBd=(item.Nombre).toLowerCase();
    if ($nombreBd==$nombre){
        $('#nombre-feed').html('Tu nombre ya esta en nuestra base de datos');
    }
})
});

});

//Boton Borrar. Limpia el formulario 
$('#borrar').on('click',function(){
$('#nombre').html("");
$('#empresa').html("");
$('#telefono').html("");
$('#email').html("");
$('#comentario').html("");
limpiarfeed();
});

//Boton Enviar. Si los datos del formulario son validos los carga en la base.
$('#enviar').on('click',function(){
$resp=validacion();
if (!$resp){
event.preventDefault();
}else{
var nombre=$('#nombre').val();
var empresa=$('#empresa').val();
var telefono=$('#telefono').val();
var email=$('#email').val();
var comentario=$('#comentario').val();
event.preventDefault(); //Para poder ver el mensaje
$.ajax({
    type: 'POST',
    url: 'php/ejer4Subir.php',
    data: {nombre:nombre,empresa:empresa,telefono:telefono,email:email,comentario:comentario}
})
.done(function(info){
    alert(info);
    location.reload();
})
.fail(function(info){
    alert(info);
    location.reload();
})
}
});

//Validacion de datos del formulario
validacion=function(){
limpiarfeed();
var $nomb=document.getElementById('nombre').value;
var $emp=document.getElementById('empresa').value;
var $tel=document.getElementById('telefono').value;
var $email=document.getElementById('email').value;
var $resp=true;
var $char=null;
//check nombre
if ($nomb.length==0){
$resp=false;
$('#nombre-feed').html('Ingrese un nombre');
}
var $arrNombre= $nomb.split("");
$.each($arrNombre,function(index,item){
$char=parseInt(item); //isNaN toma como 0 a los espacios vacios, chan.
if (!isNaN($char)){
    $resp=false;
    $('#nombre-feed').html('No se permiten numeros');
}
})
//check empresa
if ($emp.length==0){
$resp=false;
$('#empresa-feed').html('Ingrese empresa');
}
//check telefono
if ($tel.length==0){
$resp=false;
$('#telefono-feed').html('Ingrese un numero');
}
var $arrTel= $tel.split("");
$.each($arrTel,function(index,item){
if (isNaN(item)){
    $resp=false;
    $('#telefono-feed').html('No se permiten letras');
}
})
//check email
if ($email.length==0){
$resp=false;
$('#email-feed').html('Ingrese un email');
}
else{
var $arrEmail= $email.split("");
var $arroba=false;
var $punto=false;
$.each($arrEmail,function(index,item){
    if (item=="@"){
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


//Borra el texto de los mensajes de error
limpiarfeed=function(){
$('#nombre-feed').html("");
$('#empresa-feed').html("");
$('#telefono-feed').html("");
$('#email-feed').html("");
}

}); 