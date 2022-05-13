<?php
    // Conexion bd
        $mysqli = new mysqli("localhost", "root", "", "tp2");
        $query = "SELECT * FROM clientes";
        $result = $mysqli->query($query);

        $clientes = array();
    
        if ($result){
            while($row = mysqli_fetch_array($result)){
                $nombre = $row["nombre"];
                $empresa = $row["empresa"];
                $telefono = $row["telefono"];
                $email = $row["email"];
                $comentario = $row["comentario"];
                $cliente = array('nombre'=> $nombre, 'empresa'=> $empresa, 'telefono'=> $telefono, 'email'=> $email, 'comentario'=> $comentario);
                array_push($clientes, $cliente);
            }
            echo json_encode($clientes);
        }
?>