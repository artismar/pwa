<?php
    // Conexion bd
    if (isset($_GET["empresa"])){
        $mysqli = new mysqli("localhost", "root", "", "tp2");
        $empresa = $_GET["empresa"];
        $query = "SELECT * FROM clientes";
        $result = $mysqli->query($query);
        $existe = false;
        if ($result){
            while($row = mysqli_fetch_array($result)){
                if ($empresa == $row["empresa"]){
                    $existe = true;
                }
            }
            echo $existe;
        }
    }
?>