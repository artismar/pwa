<?php
define('DB_SERVER', 'localhost');
define('DB_SERVER_USERNAME', 'root');
define('DB_SERVER_PASSWORD', '');
define('DB_DATABASE', 'pwa');

$connexion = new mysqli('localhost','root','','tp2');

$html = '';
$key = $_POST['key'];
$pais = $_POST['idpais'];
$consulta =  'SELECT * FROM `estados`
WHERE descripcion LIKE "'.strip_tags($key).'%" AND `idPais`= 
'.$pais;

$result = $connexion->query($consulta);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {                
        $html .= '<div><a class="suggest-element" data="'.utf8_encode($row['descripcion']).'" id="Provincia'.$row['descripcion'].'">'.utf8_encode($row['descripcion']).'</a></div>';
    }
}
echo $html;
?>