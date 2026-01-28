<?php
require_once '../koneksi/connection.php';

try{
    $sql="SELECT * FROM `data_pendaftar`";
    $connect = $database_connection->prepare($sql);
    $connect->execute();

    $data = array();
    while($row = $connect->fetch(PDO::FETCH_ASSOC)){
        array_push($data, $row);
    }

    echo json_encode($data);

}catch (PDOException $e){
    die("tidak dapat memuat basis data $database_name: " . $e->getMessage());
}
