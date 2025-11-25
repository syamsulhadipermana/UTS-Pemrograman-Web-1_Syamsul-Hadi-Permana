<?php
require_once '../koneksi/connection.php';

$id = $_POST['id'];
try{
    $sql="DELETE FROM `data_pendaftar` WHERE `id` =?";
    $connect = $database_connection->prepare($sql);
    $connect->execute([$id]);

    echo "Data berhasil dihapus";

}catch (PDOException $e){
    die("Error deleting data" . $e->getMessage());
}

?> 