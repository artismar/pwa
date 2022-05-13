<?php
    // Conexion bd
    if (isset($_GET["id"])){
        $mysqli = new mysqli("localhost", "root", "", "tp2");
        $idArticulo = $_GET["id"];
        $query = "SELECT * FROM infomodal";
        $result = $mysqli->query($query);
    
        if ($result){
            while($row = mysqli_fetch_array($result)){
                if ($idArticulo == $row["idArticulo"]){
                    $contenido = $row;
                }
            }
            echo json_encode($contenido);
        }
    }


?>