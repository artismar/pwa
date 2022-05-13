<?php
    // Conexion bd
    if (isset($_POST["nombre"]) && isset($_POST["empresa"]) && isset($_POST["telefono"]) && isset($_POST["email"])){
        $mysqli = new mysqli("localhost", "root", "", "tp2");
        $nombre = $_POST["nombre"];
        $empresa = $_POST["empresa"];
        $telefono = $_POST["telefono"];
        $email = $_POST["email"];
        $comentario = "";
        if (isset($_POST["comentario"]))
            $comentario = $_POST["comentario"];
        $query = 'INSERT INTO clientes (nombre, empresa, telefono, email, comentario) VALUE ("'.$nombre.'", "'.$empresa.'", "'.$telefono.'", "'.$email.'", "'.$comentario.'")';
        $result = $mysqli->query($query);
        $seAgrego = "Error";
        if ($result){
            $seAgrego = "Ok";
        }
        echo $seAgrego;
    }
?>