<?php
define('DB_SERVER', 'localhost');
define('DB_SERVER_USERNAME', 'root');
define('DB_SERVER_PASSWORD', '');
define('DB_DATABASE', 'tp2');

$connexion = new mysqli('localhost','root','','tp2');

$html = '';
$key = $_POST['key'];

$result = $connexion->query(
    'SELECT * FROM `paises`
     WHERE descripcion LIKE "'.strip_tags($key).'%"
    '
);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {                
        $html .= '<div><a class="suggest-element" data="'.utf8_encode($row['descripcion']).'" id="'.$row['id'].'">'.utf8_encode($row['descripcion']).'</a></div>';
        $idpais= $row['id'];
    }
}
echo $html;
?>